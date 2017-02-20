'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.sails = {
    new: client.bind(client, {path: 'Sails'}),
    outlet: client.bind(client, {path: 'Windsurf-Sails'})
  }

  client.boards = {
    new: client.bind(client, {path: 'Boards'}),
    outlet: client.bind(client, {path: 'Windsurf-Boards_1'})
  }

  client.booms = {
    new: client.bind(client, {path: 'Booms'})
  }

  client.masts = {
    new: client.bind(client, {path: 'Masts'}),
    outlet: client.bind(client, {path: 'Masten-Special_1'})
  }

  client.fins = {
    new: client.bind(client, {path: 'Fins'})
  }

  return client
}

module.exports = createClient
