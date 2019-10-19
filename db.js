import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('database')

class MongoDBConnector {
  constructor(credentials) {
    const { host, port, name, user, pass } = credentials

    if (!(host && port && name && user && pass)) {
      throw new Error('Database credentials are not provided')
    }

    this.URI = `mongodb://${user}:${pass}@${host}:${port}/${name}`
  }

  connect() {
    mongoose.connect(this.URI, { useNewUrlParser: true })
    this.connection = mongoose.connection
    this.assignHandlers()
  }

  assignHandlers() {
    this.connection.on('error', handleConnectionError.bind(this))
    this.connection.once('open', handleConnectionOpen.bind(this))
  }
}

// handlers

function handleConnectionError(error) {
  log('Connection failed')
  log(error)
}

function handleConnectionOpen() {
  log('Connection established')
}

// exports

export const createDBConnector = (credentials) =>
  new MongoDBConnector(credentials)
