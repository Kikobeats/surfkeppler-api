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

    const hasFetch = () => {
      const {page} = query
      const currentPage = page - 1
      return currentPage < lastPage && currentPage < pages
    }

    let lastPage = Infinity

    const stream = from(function (size, next) {
      if (!hasFetch()) return next(null, null)
      fetch(fetchOpts)
        .then(res => {
          const {body} = res
          if (!body.success) return next(body.messages)
          const {lastPage: _lastPage = 1, items: rawItems} = body.data
          const pageSize = rawItems.length
          lastPage = _lastPage

          if (!rawItems || !pageSize) return next(null, null)
          const items = mapper(rawItems)
          const lastItem = items.pop()
          items.forEach(item => this.push(item))
          ++query.page

          next(null, lastItem)
        })
        .catch(next)
    })

    return stream
  }

  return reqStream
}

module.exports = createStream
