'use strict'

const should = require('should')
const {getItem, getItems} = require('../lib/mapper')

function getFixture () {
  return [
    {
      name: 'Naish Chopper XL green 2013',
      price: '249,00 � *',
      link: 'Naish-Chopper-XL-green-2013_1',
      image: 'media/image/product/26711/md/naish-chopper-xl-green-2013_1.jpg'
    },
    {
      name: 'Naish Chopper XL green 2013',
      price: null,
      link: 'Naish-Chopper-XL-green-2013_1',
      image: 'media/image/product/26711/md/naish-chopper-xl-green-2013_1.jpg'
    }
  ]
}

describe('surfkeppler-api » mapper', function () {
  describe('.getItem', function () {
    it('price is a number', function () {
      const fixture = getFixture()[0]
      const item = getItem(fixture)
      should(item.price).be.equal(249)
    })

    it('compose title using name and price', function () {
      const fixture = getFixture()[0]
      const item = getItem(fixture)
      should(item.title).be.equal('Naish Chopper XL green 2013 €249')
    })

    it('absolute link', function () {
      const fixture = getFixture()[0]
      const item = getItem(fixture)
      should(item.link).be.equal('http://surfkeppler.de/Naish-Chopper-XL-green-2013_1')
      should(item.image).be.equal('http://surfkeppler.de/media/image/product/26711/md/naish-chopper-xl-green-2013_1.jpg')
    })

    it('exclude items without price', function () {
      const fixture = getFixture()[1]
      const item = getItem(fixture)
      should(item).be.undefined()
    })
  })

  describe('.getItems', function () {
    it('iterate a collection', function () {
      const fixture = getFixture()
      const items = getItems(fixture)

      should(items).be.eql([{
        title: 'Naish Chopper XL green 2013 €249',
        name: 'Naish Chopper XL green 2013',
        image: 'http://surfkeppler.de/media/image/product/26711/md/naish-chopper-xl-green-2013_1.jpg',
        link: 'http://surfkeppler.de/Naish-Chopper-XL-green-2013_1',
        price: 249
      }])
    })
  })
})
