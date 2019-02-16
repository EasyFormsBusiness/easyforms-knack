"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Knack = require('../classes/knack');

var assert = require('assert');

require('dotenv').config();

describe('Testing Knack module', function () {
  // Using Epic360.old
  var _process$env = process.env,
      ApiKey = _process$env.ApiKey,
      AppId = _process$env.AppId;
  var id = AppId;
  var key = ApiKey;
  var objectNo = 'object_1';
  var body = {
    field_1: 'string',
    field_2: 0
  };
  var testRecord = '5b721dd585be9c6374a296f2';
  var knack = new Knack(key, id);
  knack.debug = true;
  describe('Testing info functions', function () {
    it('Should get the all objects',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knack.getObjects();

            case 2:
              response = _context.sent;
              assert.strictEqual(response.hasOwnProperty('objects'), true, 'Response does not contain an objects property');
              assert.strictEqual(response.objects.length > 0, true, 'Expected more than one object, got 0');

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('Should get the details of an object',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knack.getObject(objectNo);

            case 2:
              response = _context2.sent;
              assert.strictEqual(response.hasOwnProperty('object'), true, 'Response does not contain an object property');
              assert.strictEqual(response.object.hasOwnProperty('key'), true, 'Response object does not contain a key property');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
  }); // describe('Testing CRUD', () => {
  //   let newObj
  //   describe('Testing read one', () => {
  //     it('Should one record from a table', async () => {
  //       console.log(await knack.getOne(objectNo, testRecord))
  //     })
  //   })
  //   describe('Testing read', () => {
  //     it('Should read all the records from a table', async () => {
  //       console.log(await knack.get(objectNo))
  //     })
  //   })
  //   describe('Testing search', () => {
  //     it('Should find the updated object', async () => {
  //       console.log(
  //         await knack.search(
  //           objectNo,
  //           {
  //             match: 'and',
  //             rules: [
  //               {
  //                 field: 'field_1',
  //                 operator: 'is',
  //                 value: 'stringstring'
  //               },
  //               {
  //                 field: 'field_2',
  //                 operator: 'is',
  //                 value: 1
  //               }
  //             ]
  //           },
  //           'field_1',
  //           'asc'
  //         )
  //       )
  //     })
  //   })
  //   describe('Testing create', () => {
  //     it('Should create an object', async () => {
  //       newObj = await knack.create(objectNo, {
  //         field_1: 'string',
  //         field_2: 0,
  //         field_3: { first: 'Taylor', last: 'Kettle' }
  //       })
  //       console.log(newObj)
  //     })
  //     it('Should parse a response', async () => {
  //       let parsedRecord = await knack.parse(objectNo, newObj)
  //       assert.equal(Object.keys(parsedRecord).length > 0, true)
  //     })
  //     it('Should throw an error if no body is passed', async () => {
  //       try {
  //         await knack.create(objectNo)
  //         throw new Error('Did not throw an error for no body')
  //       } catch (error) {
  //         assert.equal(error.message, 'You must pass a body')
  //       }
  //     })
  //     it('Should throw an error if no object number is passed', async () => {
  //       try {
  //         await knack.create()
  //         throw new Error('Did not throw an error for no object number')
  //       } catch (error) {
  //         assert.equal(error.message, 'You must pass an object number')
  //       }
  //     })
  //     it('Testing create of multiple objects at once', async () => {
  //       let promises = []
  //       for (let index = 0; index < 10; index++) {
  //         promises.push(
  //           knack.create(objectNo, {
  //             field_1: 'string',
  //             field_2: 0,
  //             field_3: { first: 'Taylor', last: 'Kettle' }
  //           })
  //         )
  //       }
  //       await Promise.all(promises)
  //     })
  //   })
  //   describe('Testing update', () => {
  //     it('Should update an object', async () => {
  //       console.log(
  //         await knack.update(objectNo, newObj.id, {
  //           field_1: 'stringstring',
  //           field_2: 1,
  //           field_3: { first: 'Kaylor', last: 'Tettle' }
  //         })
  //       )
  //     })
  //   })
  //   describe('Testing upsert', () => {
  //     it('Should upsert the object', async () => {
  //       console.log(
  //         await knack.upsert(objectNo, {
  //           field_1: 'stringstring',
  //           field_2: 1,
  //           field_3_raw: 'Kaylor Tettle'
  //         })
  //       )
  //     })
  //   })
  //   describe('Testing upload', () => {
  //     it('Should upload a file', async () => {
  //       console.log(
  //         await knack.upload(
  //           'objectNo4',
  //           'field_156',
  //           '/home/tkettle/code/knack/.eslintrc.json'
  //         )
  //       )
  //     })
  //   })
  //   describe('Testing delete', () => {
  //     it('Should delete the created object', async () => {
  //       console.log(await knack.delete(objectNo, newObj.id))
  //     })
  //   })
  // })
});