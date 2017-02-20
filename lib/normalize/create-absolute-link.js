'use strict'

const url = require('url')

const BASE_URL = 'http://surfkeppler.de/'

function createAbsoluteLink (prop) {
  function absoluteLink (item) {
    const relativeLink = item[prop]
    return url.resolve(BASE_URL, relativeLink)
  }

  return absoluteLink
}

module.exports = createAbsoluteLink
