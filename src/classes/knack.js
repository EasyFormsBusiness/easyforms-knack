const fetch = require('node-fetch')
const qs = require('qs')
const regeneratorRuntime = require('regenerator-runtime')
const FormData = require('form-data')
const fs = require('fs-extra')

// Global (static) varibles (just primatives!)

// TODO: create rate limiting process so that an instance of the Knack class
// will not send more than 10 requests per second

class Knack {
  /**
   *Creates an instance of Knack.
   * @param {string} apiKey
   * @param {string} applicationId
   * @memberof Knack
   */
  constructor (apiKey, applicationId) {
    this.debug = false
    this.apiKey = apiKey
    this.applicationId = applicationId
    this.baseUrl = 'https://api.knack.com/v1/objects'
    this.headers = {
      'X-Knack-Application-Id': this.applicationId,
      'X-Knack-REST-API-KEY': this.apiKey,
      'Content-Type': 'application/json'
    }
  }

  async update (objectNo, recordId, update) {
    // console.log("Updating", objectNo, recordId, JSON.stringify(update));

    const url = `${this.baseUrl}/${objectNo}/records/${recordId}`

    try {
      let response = await (await fetch(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(update)
      })).json()
      return response
    } catch (error) {
      throw Error(error.message)
    }
  }

  async create (objectNo, body, retry = 0) {
    if (!objectNo) throw new Error('You must pass an object number')
    if (!body) throw new Error('You must pass a body')

    // console.log("Creating", objectNo, JSON.stringify(body));

    const url = `${this.baseUrl}/${objectNo}/records`
    let response
    try {
      response = await (await fetch(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(body)
      })).json()
    } catch (error) {
      retry += 1
      if (retry < 5) {
        await sleep(getRandomInt(1000 * 10))
        this.create(objectNo, body, retry)
      } else {
        throw new Error(error)
      }
    }

    return response
  }

  /**
   *
   *
   * @param {*} objectNo
   * @param {*} object The that represents the row you'd like to upsert
   * @param {*} searchObject The object to use as a filter, may be different to the one you insert
   * @returns
   * @memberof Knack
   */
  async upsert (objectNo, object, searchObject) {
    // console.log("Upsert", objectNo, JSON.stringify(object));

    if (!searchObject) searchObject = object

    let filters = Object.keys(searchObject).reduce(
      (obj, field) => {
        obj.rules.push({ field: field, operator: 'is', value: object[field] })
        return obj
      },
      { match: 'and', rules: [] }
    )

    let [record] = await this.search(objectNo, filters)

    if (record) {
      return await this.update(objectNo, record.id, object)
    } else {
      return await this.create(objectNo, object)
    }
  }

  async delete (objectNo, id, retry = 0) {
    const url = `${this.baseUrl}/${objectNo}/records/${id}`
    let response
    try {
      response = await (await fetch(url, {
        headers: this.headers,
        method: 'DELETE'
      })).json()
    } catch (error) {
      retry += 1
      if (retry < 5) {
        this.delete(objectNo, id, retry)
      } else {
        throw new Error(error)
      }
    }

    return response
  }

  async upload (object, field, filepath, retry = 0) {
    let data = new FormData()
    data.append('files', fs.createReadStream(filepath))
    const file = await (await fetch(
      `https://api.knack.com/v1/applications/${
        this.applicationId
      }/assets/file/upload`,
      {
        method: 'POST',
        headers: {
          'x-knack-rest-api-key': this.apiKey
        },
        body: data
      }
    )).json()

    if (!('id' in file)) throw new Error('Failed to create upload in knack!')

    const { id, type, filename, public_url, thumb_url, size } = file

    const row = await (await fetch(`${this.baseUrl}/${object}/records`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ [field]: id })
    })).json()

    if (!('id' in row)) {
      throw new Error('Failed to create row with file in knack!')
    }

    return row
  }

  async search (
    objectNo,
    filters,
    sortField = false,
    sortOrder = false,
    retry = 1
  ) {
    let page = 1
    let totalPages = 1
    let allRecords = []

    if (sortField ? !sortOrder : sortOrder) {
      throw new Error('Must specify both sortField and sortOrder!')
    }

    try {
      while (page <= totalPages) {
        let url = `${
          this.baseUrl
        }/${objectNo}/records?filters=${encodeURIComponent(
          JSON.stringify(filters)
        )}&rows_per_page=1000&page=${page}${
          sortField && sortOrder
            ? `&sort_field=${sortField}&sort_order=${sortOrder}`
            : ''
        }`
        if (this.debug) console.log(url)

        let { records, total_pages } = await (await fetch(url, {
          headers: this.headers
        })).json()

        allRecords = allRecords.concat(records)
        totalPages = total_pages
        page += 1
      }

      return allRecords
    } catch (error) {
      if (retry <= 5) {
        let retryDelay = Math.random() * 10 * 1000
        console.error(
          `Error searching in knack, retry no. ${retry} in ${retryDelay /
            1000} seconds...`
        )
        await sleep(retryDelay)
        return this.search(
          objectNo,
          filters,
          sortField,
          sortOrder,
          (retry += 1)
        )
      } else {
        console.error('Error searching in knack', error)
        throw Error(error)
      }
    }
  }

  async get (objectNo, retry = 1) {
    let allRecords = []
    let page = 1
    let totalPages = 1

    try {
      while (page <= totalPages) {
        let { records, total_pages } = await (await fetch(
          `${this.baseUrl}/${objectNo}/records?page=${page}&rows_per_page=1000`,
          { headers: this.headers }
        )).json()
        // console.log(Object.keys(result));

        totalPages = total_pages
        page += 1
        allRecords = allRecords.concat(records)
      }
    } catch (error) {
      console.error(error)
      if (retry < 2) {
        retry += 1
        this.get(objectNo, retry)
      }
    }
    return allRecords
  }

  async getOne (objectNo, id, retry = 1) {
    try {
      return await (await fetch(`${this.baseUrl}/${objectNo}/records/${id}`, {
        headers: this.headers
      })).json()
    } catch (error) {
      console.error(error)
      if (retry < 2) {
        retry += 1
        this.getOne(objectNo, id, retry)
      }
    }
  }
}

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

module.exports = Knack
