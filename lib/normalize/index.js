'use strict'

const reduce = require('lodash.reduce')

const createNormalizePrice = require('./create-normalize-price')
const createAbsoluteLink = require('./create-absolute-link')

const transform = {
  price: createNormalizePrice('price'),
  link: createAbsoluteLink('link'),
  image: createAbsoluteLink('image')
}

function normalize (item) {
  const normalizedItem = reduce(transform, function (acc, value, key) {
    const fn = transform[key]
    if (item[key]) acc[key] = fn(item)
    return acc
  }, {})
  return Object.assign({}, item, normalizedItem)
}

module.exports = normalize
