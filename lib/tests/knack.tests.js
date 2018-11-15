"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Knack = require("../classes/knack");

var assert = require("assert");

describe("Testing Knack module", function () {
  // Using Epic360.old
  var id = "5983ba77203a0e5c3aed6550";
  var key = "35193a40-78bc-11e7-abce-854d0143ec1e";
  var objectNo = "object_1";
  var body = {
    field_1: "string",
    field_2: 0
  };
  var knack = new Knack(key, id);
  knack.debug = true;
  describe("Testing CRUD", function () {
    var newObj;
    describe("Testing read", function () {
      it("Should read all the records from a table",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return knack.get("object_1");

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      })));
    });
    describe("Testing read one", function () {
      it("Should one record from a table",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = console;
                _context2.next = 3;
                return knack.getOne("object_1", "5bdba448e3200d47b68e9071");

              case 3:
                _context2.t1 = _context2.sent;

                _context2.t0.log.call(_context2.t0, _context2.t1);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })));
    });
    describe("Testing create", function () {
      it("Should create an object",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return knack.create(objectNo, {
                  field_1: "string",
                  field_2: 0,
                  field_3: {
                    first: "Taylor",
                    last: "Kettle"
                  }
                });

              case 2:
                newObj = _context3.sent;
                console.log(newObj);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      })));
      it("Should throw an error if no body is passed",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return knack.create(objectNo);

              case 3:
                throw new Error("Did not throw an error for no body");

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                assert.equal(_context4.t0.message, "You must pass a body");

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      })));
      it("Should throw an error if no object number is passed",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return knack.create();

              case 3:
                throw new Error("Did not throw an error for no object number");

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                assert.equal(_context5.t0.message, "You must pass an object number");

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      })));
      it("Testing create of multiple objects at once",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var promises, index;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                promises = [];

                for (index = 0; index < 10; index++) {
                  promises.push(knack.create(objectNo, {
                    field_1: "string",
                    field_2: 0,
                    field_3: {
                      first: "Taylor",
                      last: "Kettle"
                    }
                  }));
                }

                _context6.next = 4;
                return Promise.all(promises);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));
    });
    describe("Testing update", function () {
      it("Should update an object",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = console;
                _context7.next = 3;
                return knack.update(objectNo, newObj.id, {
                  field_1: "stringstring",
                  field_2: 1,
                  field_3: {
                    first: "Kaylor",
                    last: "Tettle"
                  }
                });

              case 3:
                _context7.t1 = _context7.sent;

                _context7.t0.log.call(_context7.t0, _context7.t1);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));
    });
    describe("Testing upsert", function () {
      it("Should upsert the object",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = console;
                _context8.next = 3;
                return knack.upsert(objectNo, {
                  field_1: "stringstring",
                  field_2: 1,
                  field_3_raw: "Kaylor Tettle"
                });

              case 3:
                _context8.t1 = _context8.sent;

                _context8.t0.log.call(_context8.t0, _context8.t1);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      })));
    });
    describe("Testing search", function () {
      it("Should find the updated object",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.t0 = console;
                _context9.next = 3;
                return knack.search(objectNo, {
                  match: "and",
                  rules: [{
                    field: "field_1",
                    operator: "is",
                    value: "stringstring"
                  }, {
                    field: "field_2",
                    operator: "is",
                    value: 1
                  }]
                }, "field_1", "asc");

              case 3:
                _context9.t1 = _context9.sent.length;

                _context9.t0.log.call(_context9.t0, _context9.t1);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      })));
    });
    describe("Testing delete", function () {
      it("Should delete the created object",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = console;
                _context10.next = 3;
                return knack.delete(objectNo, newObj.id);

              case 3:
                _context10.t1 = _context10.sent;

                _context10.t0.log.call(_context10.t0, _context10.t1);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      })));
    });
  });
});