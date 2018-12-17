'use strict'

// TO-DO
// Require the TransactionHandler module from SDK
// Extend the TransactionHandler module to create custom handler
// Register the transaction family, version and namespaces in the constructor
// Implement the apply function:
//  1 - Decode the transaction payload
//      Cookiejar payload is of the form "<action>,<quantity>"
//  2 - Check the cookie action to perform from the payload and pass to handler
//  3 - For bake, insert/update state
//  4 - For eat, first check if there are enough cookies, then update state.
//      If not enough cookies are present, throw InvalidTransactionError
//  5 - Getting and setting to states should be 'utf8' encoded (use the 'encoder', 'decoder' below)
// Use the _hash function for address creation

const { TransactionHandler } = // require the transaction module here from SDK


const {
  InvalidTransaction,
  InternalError
} = require('sawtooth-sdk/processor/exceptions')
const crypto = require('crypto')
const {TextEncoder, TextDecoder} = require('text-encoding/lib/encoding')

const _hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)
var encoder = new TextEncoder('utf8')
var decoder = new TextDecoder('utf8')


module.exports = // Module name here
