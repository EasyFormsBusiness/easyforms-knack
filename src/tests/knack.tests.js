const Knack = require('../classes/knack')
const assert = require('assert')
require('dotenv').config()

describe('Testing Knack module', () => {
  // Using Epic360.old
  const { ApiKey, AppId } = process.env
  const id = AppId
  const key = ApiKey
  const objectNo = 'object_1'

  const body = {
    field_1: 'string',
    field_2: 0
  }
  const testRecord = '5b721dd585be9c6374a296f2'

  let knack = new Knack(key, id)
  knack.debug = true

  describe('Testing info functions', () => {
    it('Should get the all objects', async () => {
      let response = await knack.getObjects()

      assert.strictEqual(
        response.hasOwnProperty('objects'),
        true,
        'Response does not contain an objects property'
      )
      assert.strictEqual(
        response.objects.length > 0,
        true,
        'Expected more than one object, got 0'
      )
    })

    it('Should get the details of an object', async () => {
      let response = await knack.getObject(objectNo)
      assert.strictEqual(
        response.hasOwnProperty('object'),
        true,
        'Response does not contain an object property'
      )
      assert.strictEqual(
        response.object.hasOwnProperty('key'),
        true,
        'Response object does not contain a key property'
      )
    })
  })

  // describe('Testing CRUD', () => {
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
})
