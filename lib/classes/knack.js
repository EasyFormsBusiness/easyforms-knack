"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetch = require('node-fetch');

var qs = require('qs');

var regeneratorRuntime = require('regenerator-runtime');

var FormData = require('form-data');

var fs = require('fs-extra');

var MAX_RETRY = 5;
var MAX_SLEEP = 5000;
var MIN_SLEEP = 1000; // Global (static) varibles (just primatives!)
// TODO: create rate limiting process so that an instance of the Knack class
// will not send more than 10 requests per second

var Knack =
/*#__PURE__*/
function () {
  /**
   *Creates an instance of Knack.
   * @param {string} apiKey
   * @param {string} applicationId
   * @memberof Knack
   */
  function Knack(apiKey, applicationId) {
    _classCallCheck(this, Knack);

    this.debug = false;
    this.apiKey = apiKey;
    this.applicationId = applicationId;
    this.baseUrl = 'https://api.knack.com/v1/objects';
    this.headers = {
      'X-Knack-Application-Id': this.applicationId,
      'X-Knack-REST-API-KEY': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  _createClass(Knack, [{
    key: "_parseObject",
    value: function _parseObject(record, object) {
      var parsedRecord = Object.keys(record).reduce(function (obj, key) {
        if (key === 'id') {
          obj['id'] = record[key];
          return obj;
        }

        var field = object.fields.find(function (f) {
          return f.key === key;
        });

        if (!field) {
          return obj;
        }

        var name = field.name;
        if (name) obj[name] = record[key];
        return obj;
      }, {});
      return parsedRecord;
    }
  }, {
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(objectNo, body) {
        var _this = this;

        var _ref, object;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("".concat(this.baseUrl, "/").concat(objectNo), {
                  headers: this.headers
                });

              case 2:
                _context.next = 4;
                return _context.sent.json();

              case 4:
                _ref = _context.sent;
                object = _ref.object;

                if (!Array.isArray(body)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", body.map(function (record) {
                  return _this._parseObject(record, object);
                }));

              case 10:
                return _context.abrupt("return", this._parseObject(body, object));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function parse(_x, _x2) {
        return _parse.apply(this, arguments);
      };
    }()
  }, {
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(objectNo, recordId, _update) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // console.log("Updating", objectNo, recordId, JSON.stringify(update));
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records/").concat(recordId);
                _context2.prev = 1;
                _context2.next = 4;
                return fetch(url, {
                  headers: this.headers,
                  method: 'PUT',
                  body: JSON.stringify(_update)
                });

              case 4:
                _context2.next = 6;
                return _context2.sent.json();

              case 6:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                throw Error(_context2.t0.message);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      return function update(_x3, _x4, _x5) {
        return _update2.apply(this, arguments);
      };
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(objectNo, body) {
        var retry,
            url,
            response,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                retry = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 0;

                if (objectNo) {
                  _context3.next = 3;
                  break;
                }

                throw new Error('You must pass an object number');

              case 3:
                if (body) {
                  _context3.next = 5;
                  break;
                }

                throw new Error('You must pass a body');

              case 5:
                // console.log("Creating", objectNo, JSON.stringify(body));
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records");
                _context3.prev = 6;
                _context3.next = 9;
                return fetch(url, {
                  headers: this.headers,
                  method: 'POST',
                  body: JSON.stringify(body)
                });

              case 9:
                _context3.next = 11;
                return _context3.sent.json();

              case 11:
                response = _context3.sent;
                _context3.next = 24;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](6);
                retry += 1;

                if (!(retry < MAX_RETRY)) {
                  _context3.next = 23;
                  break;
                }

                _context3.next = 20;
                return sleep();

              case 20:
                this.create(objectNo, body, retry);
                _context3.next = 24;
                break;

              case 23:
                throw new Error(_context3.t0);

              case 24:
                return _context3.abrupt("return", response);

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 14]]);
      }));

      return function create(_x6, _x7) {
        return _create.apply(this, arguments);
      };
    }()
    /**
     *
     *
     * @param {*} objectNo
     * @param {*} object The that represents the row you'd like to upsert
     * @param {*} searchObject The object to use as a filter, may be different to the one you insert
     * @returns
     * @memberof Knack
     */

  }, {
    key: "upsert",
    value: function () {
      var _upsert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(objectNo, object, searchObject) {
        var filters, _ref2, _ref3, record;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // console.log("Upsert", objectNo, JSON.stringify(object));
                if (!searchObject) searchObject = object;
                filters = Object.keys(searchObject).reduce(function (obj, field) {
                  obj.rules.push({
                    field: field,
                    operator: 'is',
                    value: object[field]
                  });
                  return obj;
                }, {
                  match: 'and',
                  rules: []
                });
                _context4.next = 4;
                return this.search(objectNo, filters);

              case 4:
                _ref2 = _context4.sent;
                _ref3 = _slicedToArray(_ref2, 1);
                record = _ref3[0];

                if (!record) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", this.update(objectNo, record.id, object));

              case 11:
                return _context4.abrupt("return", this.create(objectNo, object));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function upsert(_x8, _x9, _x10) {
        return _upsert.apply(this, arguments);
      };
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(objectNo, id) {
        var retry,
            url,
            response,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                retry = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 0;
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records/").concat(id);
                _context5.prev = 2;
                _context5.next = 5;
                return fetch(url, {
                  headers: this.headers,
                  method: 'DELETE'
                });

              case 5:
                _context5.next = 7;
                return _context5.sent.json();

              case 7:
                response = _context5.sent;
                _context5.next = 18;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](2);
                retry += 1;

                if (!(retry < MAX_RETRY)) {
                  _context5.next = 17;
                  break;
                }

                this.delete(objectNo, id, retry);
                _context5.next = 18;
                break;

              case 17:
                throw new Error(_context5.t0);

              case 18:
                return _context5.abrupt("return", response);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 10]]);
      }));

      return function _delete(_x11, _x12) {
        return _delete2.apply(this, arguments);
      };
    }()
  }, {
    key: "upload",
    value: function () {
      var _upload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(object, field, filepath) {
        var retry,
            data,
            file,
            id,
            type,
            filename,
            public_url,
            thumb_url,
            size,
            row,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                retry = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : 0;
                data = new FormData();
                data.append('files', fs.createReadStream(filepath));
                _context6.next = 5;
                return fetch("https://api.knack.com/v1/applications/".concat(this.applicationId, "/assets/file/upload"), {
                  method: 'POST',
                  headers: {
                    'x-knack-rest-api-key': this.apiKey
                  },
                  body: data
                });

              case 5:
                _context6.next = 7;
                return _context6.sent.json();

              case 7:
                file = _context6.sent;

                if ('id' in file) {
                  _context6.next = 10;
                  break;
                }

                throw new Error('Failed to create upload in knack!');

              case 10:
                id = file.id, type = file.type, filename = file.filename, public_url = file.public_url, thumb_url = file.thumb_url, size = file.size;
                _context6.next = 13;
                return fetch("".concat(this.baseUrl, "/").concat(object, "/records"), {
                  method: 'POST',
                  headers: this.headers,
                  body: JSON.stringify(_defineProperty({}, field, id))
                });

              case 13:
                _context6.next = 15;
                return _context6.sent.json();

              case 15:
                row = _context6.sent;

                if ('id' in row) {
                  _context6.next = 18;
                  break;
                }

                throw new Error('Failed to create row with file in knack!');

              case 18:
                return _context6.abrupt("return", row);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function upload(_x13, _x14, _x15) {
        return _upload.apply(this, arguments);
      };
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(objectNo, filters) {
        var sortField,
            sortOrder,
            retry,
            page,
            totalPages,
            allRecords,
            url,
            _ref4,
            records,
            total_pages,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                sortField = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : false;
                sortOrder = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : false;
                retry = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : 1;
                page = 1;
                totalPages = 1;
                allRecords = [];

                if (!(sortField ? !sortOrder : sortOrder)) {
                  _context7.next = 8;
                  break;
                }

                throw new Error('Must specify both sortField and sortOrder!');

              case 8:
                _context7.prev = 8;

              case 9:
                if (!(page <= totalPages)) {
                  _context7.next = 24;
                  break;
                }

                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records?filters=").concat(encodeURIComponent(JSON.stringify(filters)), "&rows_per_page=1000&page=").concat(page).concat(sortField && sortOrder ? "&sort_field=".concat(sortField, "&sort_order=").concat(sortOrder) : '');
                if (this.debug) console.log(url);
                _context7.next = 14;
                return fetch(url, {
                  headers: this.headers
                });

              case 14:
                _context7.next = 16;
                return _context7.sent.json();

              case 16:
                _ref4 = _context7.sent;
                records = _ref4.records;
                total_pages = _ref4.total_pages;
                allRecords = allRecords.concat(records);
                totalPages = total_pages;
                page += 1;
                _context7.next = 9;
                break;

              case 24:
                return _context7.abrupt("return", allRecords);

              case 27:
                _context7.prev = 27;
                _context7.t0 = _context7["catch"](8);

                if (!(retry < MAX_RETRY)) {
                  _context7.next = 35;
                  break;
                }

                _context7.next = 32;
                return sleep();

              case 32:
                return _context7.abrupt("return", this.search(objectNo, filters, sortField, sortOrder, retry += 1));

              case 35:
                throw new Error(_context7.t0);

              case 36:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[8, 27]]);
      }));

      return function search(_x16, _x17) {
        return _search.apply(this, arguments);
      };
    }()
    /**
     *
     *
     * @param {String} objectNo
     * @param {number} [retry=1]
     * @param {boolean} [parse=false]
     * @returns
     * @memberof Knack
     */

  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(objectNo) {
        var retry,
            parse,
            allRecords,
            page,
            totalPages,
            _ref5,
            records,
            total_pages,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                retry = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 1;
                parse = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : true;
                allRecords = [];
                page = 1;
                totalPages = 1;
                _context8.prev = 5;

              case 6:
                if (!(page <= totalPages)) {
                  _context8.next = 19;
                  break;
                }

                _context8.next = 9;
                return fetch("".concat(this.baseUrl, "/").concat(objectNo, "/records?page=").concat(page, "&rows_per_page=1000"), {
                  headers: this.headers
                });

              case 9:
                _context8.next = 11;
                return _context8.sent.json();

              case 11:
                _ref5 = _context8.sent;
                records = _ref5.records;
                total_pages = _ref5.total_pages;
                // console.log(Object.keys(result));
                totalPages = total_pages;
                page += 1;
                allRecords = allRecords.concat(records);
                _context8.next = 6;
                break;

              case 19:
                _context8.next = 31;
                break;

              case 21:
                _context8.prev = 21;
                _context8.t0 = _context8["catch"](5);

                if (!(retry < MAX_RETRY)) {
                  _context8.next = 30;
                  break;
                }

                retry += 1;
                _context8.next = 27;
                return sleep();

              case 27:
                this.get(objectNo, retry);
                _context8.next = 31;
                break;

              case 30:
                throw new Error(_context8.t0);

              case 31:
                if (parse) allRecords = this.parse(objectNo, allRecords);
                return _context8.abrupt("return", allRecords);

              case 33:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[5, 21]]);
      }));

      return function get(_x18) {
        return _get.apply(this, arguments);
      };
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(objectNo, id) {
        var retry,
            parse,
            response,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                retry = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 1;
                parse = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : true;
                _context9.prev = 2;
                _context9.next = 5;
                return fetch("".concat(this.baseUrl, "/").concat(objectNo, "/records/").concat(id), {
                  headers: this.headers
                });

              case 5:
                _context9.next = 7;
                return _context9.sent.json();

              case 7:
                response = _context9.sent;
                if (parse) response = this.parse(objectNo, response);
                return _context9.abrupt("return", response);

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](2);

                if (!(retry < MAX_RETRY)) {
                  _context9.next = 21;
                  break;
                }

                retry += 1;
                _context9.next = 18;
                return sleep();

              case 18:
                this.getOne(objectNo, id, retry);
                _context9.next = 22;
                break;

              case 21:
                throw new Error(_context9.t0);

              case 22:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 12]]);
      }));

      return function getOne(_x19, _x20) {
        return _getOne.apply(this, arguments);
      };
    }()
  }]);

  return Knack;
}();

function sleep(_ref6) {
  var _ref6$min = _ref6.min,
      min = _ref6$min === void 0 ? MIN_SLEEP : _ref6$min,
      _ref6$max = _ref6.max,
      max = _ref6$max === void 0 ? MAX_SLEEP : _ref6$max;
  var ms = Math.random() * (max - min) + min;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

module.exports = Knack;