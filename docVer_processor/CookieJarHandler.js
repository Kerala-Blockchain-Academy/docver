const { TransactionHandler } = require("sawtooth-sdk/processor/handler") // require the transaction module here from SDK
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const crypto = require('crypto')
const {TextEncoder, TextDecoder} = require('text-encoding/lib/encoding')

const _hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 58)
var encoder = new TextEncoder('utf8')
var decoder = new TextDecoder('utf8')

var familyName = 'cookiejar'
var familyVersion = '1.0'
var namespaces = _hash(familyName).substring(0,6)




  
class CJHandler extends TransactionHandler{
    constructor() {
      super(familyName, [familyVersion], [namespaces])
    }

  apply (transactionProcessRequest, stateStore){
    let signerAddress = this.getAddress(transactionProcessRequest);
    let decodedPayload = this.payloadDecoder(transactionProcessRequest.payload);

    if(decodedPayload.length === 3){
      let payload = {
        action: decodedPayload[0],
        quantity: decodedPayload[1],
        type: decodedPayload[2]
      }

      console.log('payload : ', payload);      

      //Bake

      if( payload.action === 'bake'){
        let hashedAddress = namespaces +  _hash(payload.type).substring(0, 6)  + _hash(signerAddress)
        console.log("address", hashedAddress);
        return stateStore.getState([hashedAddress])
                  .then((stateMapping) =>{
                    console.log("stateMapping", stateMapping)
                    let myState = stateMapping[hashedAddress]
                    console.log("myState", myState)
                    let pastState = 0;
                    if(myState === ""|| myState === null){
                      console.log("No previous cookies, creating new cookie jar ");
                      pastState = 0
                    }
                    else{
                      pastState = decoder.decode(myState);
                      console.log("Cookies in the jar:"+pastState)
                    }

                    let newStateStr = (pastState + parseInt(payload.quantity)).toString();
                    let newState = encoder.encode(newStateStr);
                    let entries = {
                      [hashedAddress] : newState
                    }
                    console.log('entries : ', entries);                    
                    return stateStore.setState(entries)
                              .then((returnAfterSetState) =>{
                                console.log("returnAfterSetState", returnAfterSetState);
                                return returnAfterSetState;
                              })

                  })
      }

      //Eat
      if( payload.action === 'eat'){
        let hashedAddress = namespaces +  _hash(payload.type).substring(0, 6)  + _hash(signerAddress)
        console.log("address", hashedAddress);
        stateStore.getState([hashedAddress])
                  .then((stateMapping) =>{
                    console.log("stateMapping", stateMapping)
                    let myState = stateMapping[hashedAddress]
                    console.log("myState", myState)
                    let pastState = 0,
                        newState = 0;
                    if(myState === ""|| myState === null){
                      pastState = 0;
                    }
                    else{
                      pastState = parseInt(myState);

                    }

                    if(pastState < parseInt(payload.quantity)){
                      let error = new InvalidTransaction("Insufficient Balance");
                      console.log(error);
                    }
                    else{
                      newState = pastState - parseInt(payload.quantity);
                      stateStore.setState({[hashedAddress]:newState})
                              .then((returnAfterSetState) =>{
                                console.log("returnAfterSetState", returnAfterSetState)
                              })
                    }


                  })
      }
    }

    //Send
    else if(decodedPayload.length === 4){
            let payload = {
              action: decodedPayload[0],
              quantity: decodedPayload[1],
              type: decodedPayload[2],
              address: decodedPayload[3]
            }
            if( payload.action === 'send'){
              let senderHashedAddress = namespaces +  _hash(payload.type).substring(0, 6)  + _hash(signerAddress);
              let receiverHashedAddress = namespaces +  _hash(payload.type).substring(0, 6)  + _hash(payload.address);
              console.log("senderAddress", senderHashedAddress);
              stateStore.getState([senderHashedAddress])
                        .then((stateMapping) =>{
                          console.log("senderStateMapping", stateMapping)
                          let senderState = stateMapping[senderHashedAddress]
                          console.log("senderState", myState)
                          let senderPastState = 0;
                          if(senderState === ""|| senderState === null){
                            senderPastState = 0;
                          }
                          else{
                            senderPastState = parseInt(senderState);

                          }

                          if(senderPastState < parseInt(payload.quantity)){
                            let error = new InvalidTransaction("Insufficient Balance");
                            console.log(error);
                          }

                          else{
                            stateStore.getState([receiverHashedAddress])
                                      .then((receiverStateMapping) =>{
                                        console.log("receiverStateMapping", receiverStateMapping)
                                        let receiverState = stateMapping[receiverHashedAddress]
                                        console.log("receiverState", receiverState)
                                        let receiverPastState = 0;
                                        if(receiverState === ""|| receiverState === null){
                                          receiverPastState = 0
                                        }
                                        else{
                                          receiverPastState = parseInt(receiverState);
                                        }

                                        let senderNewState = receiverPastState + parseInt(payload.quantity)
                                        let receiverNewState = pastState - parseInt(payload.quantity);
                                        stateStore.setState({[senderHashedAddress]:senderNewState})
                                                  .then((returnAfterSetState) =>{
                                                    console.log("returnAfterSetState", returnAfterSetState)
                                                  })
                                        stateStore.setState({[receiverHashedAddress]:receiverNewState})
                                                  .then((returnAfterSetState) =>{
                                                    console.log("returnAfterSetState", returnAfterSetState)
                                                  })

                                      })
                          }


                        })
            }
    }

    else{
       let error = new InvalidTransaction("Invalid Payload")
       console.log(error)
    }
  }


  payloadDecoder(payload){
    let decodedPayload = payload.toString().split(',')
    return decodedPayload
  }

  getAddress(request){
    let requestHeader = request.header
    let requestSignerPublicKey = requestHeader.signerPublicKey
    return requestSignerPublicKey
  }

}


module.exports = CJHandler// Module name here