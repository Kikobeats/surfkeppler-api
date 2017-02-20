'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.sails = {
    used: client.bind(client, {path: 'Windsurf-Sails'}),
    new: client.bind(client, {path: ''})
  }

  client.boards = {
    used: client.bind(client, {path: ''}),
    new: client.bind(client, {path: ''})
  }

  client.booms = {
    used: client.bind(client, {path: ''}),
    new: client.bind(client, {path: ''})
  }

  client.masts = {
    used: client.bind(client, {path: ''}),
    new: client.bind(client, {path: ''})
  }

  client.accesories = {
    used: client.bind(client, {path: ''}),
    new: client.bind(client, {path: ''})
  }

  return client
}

module.exports = createClient
