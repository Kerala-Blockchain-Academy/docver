/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const { TransactionHandler } = require('sawtooth-sdk/processor/handler'); // require the transaction module here from SDK
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions');
const crypto = require('crypto');
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding');

// eslint-disable-next-line max-len
// const hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 58);
const encoder = new TextEncoder('utf8');
const decoder = new TextDecoder('utf8');

function hash(x) {
  const hex = crypto.createHash('sha512').update(x).digest('hex');
  const hexLow = hex.toLocaleLowerCase();
  const hexTrunc = hexLow.substring(0, 58);
  return hexTrunc;
}

const familyName = 'docVer';
const familyVersion = '1.0';
const namespaces = hash(familyName).substring(0, 6);


class DocVerHandler extends TransactionHandler {
  constructor() {
    super(familyName, [familyVersion], [namespaces]);
  }

  apply(transactionProcessRequest, stateStore) {
    const signerAddress = this.getAddress(transactionProcessRequest);
    const decodedPayload = this.payloadDecoder(transactionProcessRequest.payload);

    if (Object.keys(decodedPayload).length === 2) {
      const { action, payload } = decodedPayload;
      console.log(decodedPayload);
      console.log(action);
      console.log(payload);

      const payloadJson = JSON.parse(payload);

      if (action === 'Generate') {
        const stateAddress = this.getStateAddress(payloadJson);
        return stateStore.getState([stateAddress])
          .then((stateMapping) => {
            const currentState = stateMapping[stateAddress];
            // eslint-disable-next-line eqeqeq
            if (currentState == '' || currentState == null) {
              const transactionId = this.getTransactionId(transactionProcessRequest);
              const transactionIdEncoded = encoder.encode(transactionId);
              const newEntry = this.creatEntry(stateAddress, transactionIdEncoded);
              return stateStore.setState(newEntry)
                .then(setStateReturn => setStateReturn);
            }
            const errData = {
              response: 'Document alredy exist',
              address: stateAddress,
              signer: signerAddress,
            };
            const errString = JSON.stringify(errData);
            const error = new InvalidTransaction(errString);
            throw error;
          });
      }
      return new InvalidTransaction(`Action must be Generate or Edit not ${action}`);
    }
    return new InvalidTransaction('Invalid Payload');
  }

  payloadDecoder(payload) {
    const decodedPayload = decoder.decode(payload);
    this.decodedPayloadJson = JSON.parse(decodedPayload);
    return this.decodedPayloadJson;
  }

  getAddress(request) {
    const requestHeader = request.header;
    this.requestSignerPublicKey = requestHeader.signerPublicKey;
    return this.requestSignerPublicKey;
  }

  getTransactionId(request) {
    this.transactionId = request.signature;
    return this.transactionId;
  }

  creatEntry(stateAddress, transactionId) {
    this.entry = {
      [stateAddress]: transactionId,
    };
    return this.entry;
  }

  getStateAddress(payload) {
    const payloadKeys = Object.keys(payload);
    const important = payload.imp;
    const docType = payload.docType;
    const length = important.length;
    const hashLength = Math.floor(58 / length);
    let userHash = '';
    important.forEach((element) => {
      const imppayload = payload[payloadKeys[element]];
      console.log(payloadKeys[element]);
      const tmp = hash(imppayload).substr(0, hashLength);
      userHash += tmp;
      console.log(':', imppayload, ';', tmp, '->', userHash);
    });

    while (userHash.length < 58) {
      userHash += '0';
    }

    this.address = hash(familyName).substr(0, 6)
                  + userHash
                  + hash(docType).substr(0, 6);
    return this.address;
  }
}

module.exports = DocVerHandler;
