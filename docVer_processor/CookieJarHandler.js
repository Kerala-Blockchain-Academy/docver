/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const { TransactionHandler } = require('sawtooth-sdk/processor/handler'); // require the transaction module here from SDK
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions');
const crypto = require('crypto');
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding');

const hash = (x) => {
  crypto.createHash('sha512').update(x).digest('hex').toLowerCase()
    .substring(0, 58);
};
const encoder = new TextEncoder('utf8');
const decoder = new TextDecoder('utf8');

const familyName = 'cookiejar';
const familyVersion = '1.0';
const namespaces = hash(familyName).substring(0, 6);


class CJHandler extends TransactionHandler {
  constructor() {
    super(familyName, [familyVersion], [namespaces]);
  }

  apply(transactionProcessRequest, stateStore) {
    const signerAddress = this.getAddress(transactionProcessRequest);
    const decodedPayload = this.payloadDecoder(transactionProcessRequest.payload);

    if (decodedPayload.length === 3) {
      const payload = {
        action: decodedPayload[0],
        quantity: decodedPayload[1],
        type: decodedPayload[2],
      };

      console.log('payload : ', payload);

      // Bake

      if (payload.action === 'bake') {
        const hashedAddress = namespaces + hash(payload.type).substring(0, 6) + hash(signerAddress);
        console.log('address', hashedAddress);
        return stateStore.getState([hashedAddress])
          .then((stateMapping) => {
            console.log('stateMapping', stateMapping);
            const myState = stateMapping[hashedAddress];
            console.log('myState', myState);
            let pastState = 0;
            if (myState === '' || myState === null) {
              console.log('No previous cookies, creating new cookie jar ');
              pastState = 0;
            } else {
              pastState = decoder.decode(myState);
              console.log(`Cookies in the jar:${pastState}`);
            }

            const newStateStr = (pastState + parseInt(payload.quantity, 10)).toString();
            const newState = encoder.encode(newStateStr);
            const entries = {
              [hashedAddress]: newState,
            };
            console.log('entries : ', entries);
            return stateStore.setState(entries)
              .then((returnAfterSetState) => {
                console.log('returnAfterSetState', returnAfterSetState);
                return returnAfterSetState;
              });
          });
      }

      // Eat
      if (payload.action === 'eat') {
        const hashedAddress = namespaces + hash(payload.type).substring(0, 6) + hash(signerAddress);
        console.log('address', hashedAddress);
        stateStore.getState([hashedAddress])
          .then((stateMapping) => {
            console.log('stateMapping', stateMapping);
            const myState = stateMapping[hashedAddress];
            console.log('myState', myState);
            let pastState = 0;


            let newState = 0;
            if (myState === '' || myState === null) {
              pastState = 0;
            } else {
              pastState = parseInt(myState, 10);
            }

            if (pastState < parseInt(payload.quantity, 10)) {
              const error = new InvalidTransaction('Insufficient Balance');
              console.log(error);
            } else {
              newState = pastState - parseInt(payload.quantity, 10);
              stateStore.setState({ [hashedAddress]: newState })
                .then((returnAfterSetState) => {
                  console.log('returnAfterSetState', returnAfterSetState);
                });
            }
          });
      }
    // eslint-disable-next-line brace-style
    }

    // Send
    else if (decodedPayload.length === 4) {
      const payload = {
        action: decodedPayload[0],
        quantity: decodedPayload[1],
        type: decodedPayload[2],
        address: decodedPayload[3],
      };
      if (payload.action === 'send') {
        const senderHashedAddress = namespaces
                                  + hash(payload.type).substring(0, 6)
                                  + hash(signerAddress);
        const receiverHashedAddress = namespaces
                                    + hash(payload.type).substring(0, 6)
                                    + hash(payload.address);
        console.log('senderAddress', senderHashedAddress);
        stateStore.getState([senderHashedAddress])
          .then((stateMapping) => {
            console.log('senderStateMapping', stateMapping);
            const senderState = stateMapping[senderHashedAddress];
            console.log('senderState', senderState);
            let senderPastState = 0;
            if (senderState === '' || senderState === null) {
              senderPastState = 0;
            } else {
              senderPastState = parseInt(senderState, 10);
            }

            if (senderPastState < parseInt(payload.quantity, 10)) {
              const error = new InvalidTransaction('Insufficient Balance');
              console.log(error);
            } else {
              stateStore.getState([receiverHashedAddress])
                .then((receiverStateMapping) => {
                  console.log('receiverStateMapping', receiverStateMapping);
                  const receiverState = stateMapping[receiverHashedAddress];
                  console.log('receiverState', receiverState);
                  let receiverPastState = 0;
                  if (receiverState === '' || receiverState === null) {
                    receiverPastState = 0;
                  } else {
                    receiverPastState = parseInt(receiverState, 10);
                  }

                  const senderNewState = receiverPastState + parseInt(payload.quantity, 10);
                  const receiverNewState = senderPastState - parseInt(payload.quantity, 10);
                  stateStore.setState({ [senderHashedAddress]: senderNewState })
                    .then((returnAfterSetState) => {
                      console.log('returnAfterSetState', returnAfterSetState);
                    });
                  stateStore.setState({ [receiverHashedAddress]: receiverNewState })
                    .then((returnAfterSetState) => {
                      console.log('returnAfterSetState', returnAfterSetState);
                    });
                });
            }
          });
      }
    } else {
      const error = new InvalidTransaction('Invalid Payload');
      console.log(error);
    }
  }


  payloadDecoder(payload) {
    const decodedPayload = payload.toString().split(',');
    return decodedPayload;
  }

  getAddress(request) {
    const requestHeader = request.header;
    const requestSignerPublicKey = requestHeader.signerPublicKey;
    return requestSignerPublicKey;
  }
}


module.exports = CJHandler;// Module name here
