"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetch = require("node-fetch");

var qs = require("qs");

var regeneratorRuntime = require("regenerator-runtime"); // Global (static) varibles (just primatives!)


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

    this.apiKey = apiKey;
    this.applicationId = applicationId;
    this.baseUrl = "https://api.knack.com/v1/objects";
    this.headers = {
      "X-Knack-Application-Id": this.applicationId,
      "X-Knack-REST-API-KEY": this.apiKey,
      "Content-Type": "application/json"
    };
  }

  _createClass(Knack, [{
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(objectNo, recordId, _update) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log("Updating", objectNo, recordId, JSON.stringify(update));
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records/").concat(recordId);
                _context.prev = 1;
                _context.next = 4;
                return fetch(url, {
                  headers: this.headers,
                  method: "PUT",
                  body: JSON.stringify(_update)
                });

              case 4:
                _context.next = 6;
                return _context.sent.json();

              case 6:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                throw Error(_context.t0.message);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      return function update(_x, _x2, _x3) {
        return _update2.apply(this, arguments);
      };
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(objectNo, body) {
        var retry,
            url,
            response,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                retry = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 0;

                if (objectNo) {
                  _context2.next = 3;
                  break;
                }

                throw new Error("You must pass an object number");

              case 3:
                if (body) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("You must pass a body");

              case 5:
                // console.log("Creating", objectNo, JSON.stringify(body));
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records");
                _context2.prev = 6;
                _context2.next = 9;
                return fetch(url, {
                  headers: this.headers,
                  method: "POST",
                  body: JSON.stringify(body)
                });

              case 9:
                _context2.next = 11;
                return _context2.sent.json();

              case 11:
                response = _context2.sent;
                _context2.next = 24;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](6);
                retry += 1;

                if (!(retry < 5)) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 20;
                return sleep(getRandomInt(1000 * 10));

              case 20:
                this.create(objectNo, body, retry);
                _context2.next = 24;
                break;

              case 23:
                throw new Error(_context2.t0);

              case 24:
                return _context2.abrupt("return", response);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 14]]);
      }));

      return function create(_x4, _x5) {
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
      regeneratorRuntime.mark(function _callee3(objectNo, object, searchObject) {
        var filters, _ref, _ref2, record;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // console.log("Upsert", objectNo, JSON.stringify(object));
                if (!searchObject) searchObject = object;
                filters = Object.keys(searchObject).reduce(function (obj, field) {
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
                _context3.next = 4;
                return this.search(objectNo, filters);

              case 4:
                _ref = _context3.sent;
                _ref2 = _slicedToArray(_ref, 1);
                record = _ref2[0];

                if (!record) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 10;
                return this.update(objectNo, record.id, object);

              case 10:
                return _context3.abrupt("return", _context3.sent);

              case 13:
                _context3.next = 15;
                return this.create(objectNo, object);

              case 15:
                return _context3.abrupt("return", _context3.sent);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function upsert(_x6, _x7, _x8) {
        return _upsert.apply(this, arguments);
      };
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(objectNo, id) {
        var retry,
            url,
            response,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                retry = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 0;
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records/").concat(id);
                _context4.prev = 2;
                _context4.next = 5;
                return fetch(url, {
                  headers: this.headers,
                  method: "DELETE"
                });

              case 5:
                _context4.next = 7;
                return _context4.sent.json();

              case 7:
                response = _context4.sent;
                _context4.next = 18;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);
                retry += 1;

                if (!(retry < 5)) {
                  _context4.next = 17;
                  break;
                }

                this.delete(objectNo, id, retry);
                _context4.next = 18;
                break;

              case 17:
                throw new Error(_context4.t0);

              case 18:
                return _context4.abrupt("return", response);

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 10]]);
      }));

      return function _delete(_x9, _x10) {
        return _delete2.apply(this, arguments);
      };
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(objectNo, filters) {
        var retry,
            page,
            totalPages,
            allRecords,
            url,
            _ref3,
            records,
            total_pages,
            retryDelay,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                retry = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 1;
                page = 1;
                totalPages = 1;
                allRecords = [];
                url = "".concat(this.baseUrl, "/").concat(objectNo, "/records?filters=").concat(encodeURIComponent(JSON.stringify(filters)));
                _context5.prev = 5;

              case 6:
                if (!(page <= totalPages)) {
                  _context5.next = 19;
                  break;
                }

                _context5.next = 9;
                return fetch("".concat(this.baseUrl, "/").concat(objectNo, "/records?filters=").concat(encodeURIComponent(JSON.stringify(filters)), "&rows_per_page=1000&page=").concat(page), {
                  headers: this.headers
                });

              case 9:
                _context5.next = 11;
                return _context5.sent.json();

              case 11:
                _ref3 = _context5.sent;
                records = _ref3.records;
                total_pages = _ref3.total_pages;
                allRecords = allRecords.concat(records);
                totalPages = total_pages;
                page += 1;
                _context5.next = 6;
                break;

              case 19:
                return _context5.abrupt("return", allRecords);

              case 22:
                _context5.prev = 22;
                _context5.t0 = _context5["catch"](5);

                if (!(retry <= 5)) {
                  _context5.next = 32;
                  break;
                }

                retryDelay = Math.random() * 10 * 1000;
                console.error("Error searching in knack, retry no. ".concat(retry, " in ").concat(retryDelay / 1000, " seconds..."));
                _context5.next = 29;
                return sleep(retryDelay);

              case 29:
                return _context5.abrupt("return", this.search(objectNo, filters, retry += 1));

              case 32:
                console.error("Error searching in knack", _context5.t0);
                throw Error(_context5.t0);

              case 34:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 22]]);
      }));

      return function search(_x11, _x12) {
        return _search.apply(this, arguments);
      };
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(objectNo) {
        var retry,
            allRecords,
            page,
            totalPages,
            _ref4,
            records,
            total_pages,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                retry = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
                allRecords = [];
                page = 1;
                totalPages = 1;
                _context6.prev = 4;

              case 5:
                if (!(page <= totalPages)) {
                  _context6.next = 18;
                  break;
                }

                _context6.next = 8;
                return fetch("".concat(this.baseUrl, "/").concat(objectNo, "/records?page=").concat(page, "&rows_per_page=1000"), {
                  headers: this.headers
                });

              case 8:
                _context6.next = 10;
                return _context6.sent.json();

              case 10:
                _ref4 = _context6.sent;
                records = _ref4.records;
                total_pages = _ref4.total_pages;
                // console.log(Object.keys(result));
                totalPages = total_pages;
                page += 1;
                allRecords = allRecords.concat(records);
                _context6.next = 5;
                break;

              case 18:
                _context6.next = 24;
                break;

              case 20:
                _context6.prev = 20;
                _context6.t0 = _context6["catch"](4);
                console.error(_context6.t0);

                if (retry < 2) {
                  retry += 1;
                  this.get(objectNo, retry);
                }

              case 24:
                return _context6.abrupt("return", allRecords);

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[4, 20]]);
      }));

      return function get(_x13) {
        return _get.apply(this, arguments);
      };
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(objectNo, id) {
        var retry,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                retry = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 1;
                _context7.prev = 1;
                _context7.next = 4;
                return fetch("".concat(this.baseUrl, "/objects/").concat(objectNo, "/").concat(id), {
                  headers: this.headers
                });

              case 4:
                _context7.next = 6;
                return _context7.sent.json();

              case 6:
                _context7.next = 12;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](1);
                console.error(_context7.t0);

                if (retry < 2) {
                  retry += 1;
                  this.getOne(objectNo, id, retry);
                }

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 8]]);
      }));

      return function getOne(_x14, _x15) {
        return _getOne.apply(this, arguments);
      };
    }()
  }]);

  return Knack;
}();

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Knack;