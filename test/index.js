'use strict'

const isAbsoluteUrl = require('is-absolute-url')
const should = require('should')

const createClient = require('..')
const env = process.env.NODE_ENV || 'development'
const log = env === 'development' ? console.log : function () {}

describe('surfkeppler-api', function () {
  const client = createClient({
    key: process.env.API_KEY
  })

  describe('multiple pages', function () {
    const stream = client.sails.outlet()
    let count = 0
    let buffer = []

    it('fetch data', function (done) {
      stream.on('data', function (item) {
        log(++count, item)
        buffer.push(item)
      })

      stream.on('error', done)

      stream.on('end', function () {
        should(count > 1).be.true()

        buffer.forEach(item => {
          describe(`${item.title}`, function () {
            should(item).be.an.Object()

            describe('url', function () {
              ;[
                'link',
                'image'
              ].forEach(function (prop) {
                it(prop, () => should(isAbsoluteUrl(item[prop])).be.true())
              })
            })

            describe('rest of props', function () {
              it('name', () => should(item.name).be.an.String())
              it('price', () => should(item.price).be.a.Number())
            })
          })
        })
        done()
      })
    })
  })

  describe('one page', function () {
    const stream = client.boards.outlet()
    let count = 0
    let buffer = []

    it('fetch data', function (done) {
      stream.on('data', function (item) {
        log(++count, item)
        buffer.push(item)
      })

      stream.on('error', done)

      stream.on('end', function () {
        should(count > 1).be.true()

        buffer.forEach(item => {
          describe(`${item.title}`, function () {
            should(item).be.an.Object()

            describe('url', function () {
              ;[
                'link',
                'image'
              ].forEach(function (prop) {
                it(prop, () => should(isAbsoluteUrl(item[prop])).be.true())
              })
            })

            describe('rest of props', function () {
              it('name', () => should(item.name).be.an.String())
              it('price', () => should(item.price).be.a.Number())
            })
          })
        })
        done()
      })
    })
  })
})
