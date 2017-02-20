# surfkeppler-api

[![Greenkeeper badge](https://badges.greenkeeper.io/Kikobeats/surfkeppler-api.svg)](https://greenkeeper.io/)

![Last version](https://img.shields.io/github/tag/Kikobeats/surfkeppler-api.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/surfkeppler-api/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/surfkeppler-api)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/surfkeppler-api.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/surfkeppler-api)
[![Dependency status](http://img.shields.io/david/Kikobeats/surfkeppler-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/surfkeppler-api)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/surfkeppler-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/surfkeppler-api#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/surfkeppler-api.svg?style=flat-square)](https://www.npmjs.org/package/surfkeppler-api)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Programatic API access for surfkeppler.de

## Install

```bash
$ npm install surfkeppler-api --save
```

## Usage

```js
const surfkeppler = require('surfkeppler-api')

const stream = surfkeppler({
  key: process.env.API_KEY, // API Key credentials
  pages: 999 // Number of items per page [default=999]
})
```

## License

MIT © [Kiko Beats](http://kikobeats.com)
