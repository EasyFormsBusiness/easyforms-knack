"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/web.dom.iterable");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const fetch = require("node-fetch");

const qs = require("qs"); // Global (static) varibles (just primatives!)


class Knack {
  /**
   *Creates an instance of Knack.
   * @param {string} apiKey
   * @param {string} applicationId
   * @memberof Knack
   */
  constructor(apiKey, applicationId) {
    this.apiKey = apiKey;
    this.applicationId = applicationId;
    this.baseUrl = "https://api.knack.com/v1/objects";
    this.headers = {
      "X-Knack-Application-Id": this.applicationId,
      "X-Knack-REST-API-KEY": this.apiKey,
      "Content-Type": "application/json"
    };
  }

  async update(objectNo, recordId, update) {
    // console.log("Updating", objectNo, recordId, JSON.stringify(update));
    const url = `${this.baseUrl}/${objectNo}/records/${recordId}`;

    try {
      let response = await (await fetch(url, {
        headers: this.headers,
        method: "PUT",
        body: JSON.stringify(update)
      })).json();
      return response;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async create(objectNo, body, retry = 0) {
    if (!objectNo) throw new Error("You must pass an object number");
    if (!body) throw new Error("You must pass a body"); // console.log("Creating", objectNo, JSON.stringify(body));

    const url = `${this.baseUrl}/${objectNo}/records`;
    let response;

    try {
      response = await (await fetch(url, {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify(body)
      })).json();
    } catch (error) {
      retry += 1;

      if (retry < 5) {
        await sleep(getRandomInt(1000 * 10));
        this.create(objectNo, body, retry);
      } else {
        throw new Error(error);
      }
    }

    return response;
  }

  async upsert(objectNo, object) {
    // console.log("Upsert", objectNo, JSON.stringify(object));
    let filters = Object.keys(object).reduce((obj, field) => {
      obj.rules.push({
        field: field,
        operator: "is",
        value: object[field]
      });
      return obj;
    }, {
      match: "and",
      rules: []
    });

    let _ref = await this.search(objectNo, filters),
        _ref2 = _slicedToArray(_ref, 1),
        record = _ref2[0];

    if (record) {
      return await this.update(objectNo, record.id, object);
    } else {
      return await this.create(objectNo, object);
    }
  }

  async delete(objectNo, id, retry = 0) {
    const url = `${this.baseUrl}/${objectNo}/records/${id}`;
    let response;

    try {
      response = await (await fetch(url, {
        headers: this.headers,
        method: "DELETE"
      })).json();
    } catch (error) {
      retry += 1;

      if (retry < 5) {
        this.delete(objectNo, id, retry);
      } else {
        throw new Error(error);
      }
    }

    return response;
  }

  async search(objectNo, filters, retry = 1) {
    // console.log("Searching", objectNo, JSON.stringify(filters));
    const url = `${this.baseUrl}/${objectNo}/records?filters=${encodeURIComponent(JSON.stringify(filters))}`;

    try {
      let _ref3 = await (await fetch(url, {
        headers: this.headers
      })).json(),
          records = _ref3.records;

      return records;
    } catch (error) {
      if (retry <= 5) {
        let retryDelay = Math.random() * 10 * 1000;
        console.error(`Error searching in knack, retry no. ${retry} in ${retryDelay / 1000} seconds...`);
        await sleep(retryDelay);
        return this.search(objectNo, filters, retry += 1);
      } else {
        console.error("Error searching in knack", error);
        throw Error(error);
      }
    }
  }

  async get(objectNo, retry = 1) {
    let allRecords = [];
    let page = 1;
    let totalPages = 1;

    try {
      while (page <= totalPages) {
        let _ref4 = await (await fetch(`${this.baseUrl}/${objectNo}/records?page=${page}&rows_per_page=1000`, {
          headers: this.headers
        })).json(),
            records = _ref4.records,
            total_pages = _ref4.total_pages; // console.log(Object.keys(result));


        totalPages = total_pages;
        page += 1;
        allRecords = allRecords.concat(records);
      }
    } catch (error) {
      console.error(error);

      if (retry < 2) {
        retry += 1;
        this.get(objectNo, retry);
      }
    }

    return allRecords;
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Knack;