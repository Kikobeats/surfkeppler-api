'use strict'

const from = require('from2').obj
const got = require('got')

const CONST = require('./constants')
const mapper = require('./mapper')

const fetch = (opts) => got.get(CONST.ENDPOINT, opts)

const DEFAULT = {
  pages: 999
}

function createStream (opts) {
  const {
    key: wrapAPIKey,
    pages = DEFAULT.pages
  } = opts

  function reqStream (query) {
    Object.assign(query, {wrapAPIKey, page: 1})
    const fetchOpts = {json: true, query}
    const hasFetch = () => query.page - 1 < pages
    let itemsPerPage

    const stream = from(function (size, next) {
      if (!hasFetch()) return next(null, null)
      fetch(fetchOpts)
        .then(res => {
          const {body} = res
          if (!body.success) return next(body.messages)
          const rawItems = body.data.items
          const pageSize = rawItems.length

          if (!rawItems || !pageSize) return next(null, null)
          if (!itemsPerPage) itemsPerPage = pageSize

          const items = mapper(rawItems)
          const lastItem = items.pop()
          items.forEach(item => this.push(item))
          ++query.page

          next(null, lastItem)
          if (pageSize < itemsPerPage) next(null, null)
        })
        .catch(next)
    })

    return stream
  }

  return reqStream
}

module.exports = createStream
