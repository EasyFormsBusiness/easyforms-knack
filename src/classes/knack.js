const fetch = require("node-fetch");
const qs = require("qs");
const sleep = require("util").promisify(setTimeout);

// Global (static) varibles (just primatives!)

class Knack {
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
    console.log("Updating", objectNo, recordId, JSON.stringify(update));

    const url = `${this.baseUrl}/${objectNo}/records/${recordId}`;

    try {
      let response = await fetch(url, {
        headers: this.headers,
        method: "PUT",
        body: JSON.stringify(update)
      });
      return response;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async create(objectNo, body) {
    if (!objectNo) throw new Error("You must pass an object number");
    if (!body) throw new Error("You must pass a body");

    const url = `${this.baseUrl}/${objectNo}/records`;
    let response = await fetch(url, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(body)
    });

    return response;
  }

  async delete(objectNo, id) {
    const url = `${this.baseUrl}/${objectNo}/records/${id}`;
    let response = await fetch(url, {
      headers: this.headers,
      method: "DELETE"
    });

    return response;
  }

  async search(objectNo, filters, retry = 1) {
    console.log("Searching", objectNo, JSON.stringify(filters));

    const url = `${
      this.baseUrl
    }/${objectNo}/records?filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`;

    try {
      let { records } = await (await fetch(url, {
        headers: this.headers
      })).json();

      return records;
    } catch (error) {
      if (retry <= 5) {
        let retryDelay = Math.random() * 10 * 1000;
        console.error(
          `Error searching in knack, retry no. ${retry} in ${retryDelay /
            1000} seconds...`
        );
        await sleep(retryDelay);
        return this.search(objectNo, filters, (retry += 1));
      } else {
        console.error("Error searching in knack", error);
        throw Error(error);
      }
    }
  }
}

module.exports = Knack;
