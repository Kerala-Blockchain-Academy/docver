/* eslint-disable no-console */


const { TransactionProcessor } = require('sawtooth-sdk/processor');
// const CJHandler = require('./CookieJarHandler');
const DocVerHandler = require('./DovVerHandler');

if (process.argv.length < 3) {
  console.log('missing a validator address');
  process.exit(1);
}

const address = process.argv[2];

const transactionProcessor = new TransactionProcessor(address);

// transactionProcessor.addHandler(new CJHandler());
transactionProcessor.addHandler(new DocVerHandler());

transactionProcessor.start();
