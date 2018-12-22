import { Injectable } from '@angular/core';
import { createHash } from 'crypto-browserify';
import { CryptoFactory, createContext } from 'sawtooth-sdk/signing';
import * as protobuf from 'sawtooth-sdk/protobuf';
import {Secp256k1PrivateKey} from 'sawtooth-sdk/signing/secp256k1';
import { TextEncoder, TextDecoder } from 'text-encoding/lib/encoding';
import { Buffer } from 'buffer/';




@Injectable({
  providedIn: 'root'
})

export class SawtoothService {

<<<<<<< HEAD
  logData(action,values){
    console.log(action,JSON.stringify(values),"services")
  }
  constructor() { }
=======
  private signer: any;
  private publicKey: any;
  private privateKey: any;
  private address: any;
  private context: any;
  public loggedInStatus: any;

  private FAMILY_NAME = 'docVer';
  private FAMILY_VERSION = '1.0';

  private encoder = new TextEncoder('utf8');
  private REST_API_BASE_URL = 'http://localhost:4200/api';
  // private REST_API_BASE_URL = 'http://sawtooth-rest-api:8008';
  private privateKeyHex = '76ad89d0ff29b0267fba72ea8d40ef7975e10f8acde8d50d20cdf56ba9599c5e';


  /*
  Function to complete
    - setCurrentTransactor
    - getEncodedPayload
    - getTransactionsList
    - getBatchList
    - getState
    - postBatchList
  */
  constructor() {
    // Inside the setCurrentTransactor function:
    // Set the this.signer property
    // Set the this.publicKey property
    // Set the this.address property
    this.loggedInStatus = this.setCurrentTransactor(this.privateKeyHex);

  }

  public clearLogin(): boolean {
    console.log('Cleared the login credentials');
    this.loggedInStatus = false;
    this.signer = null;
    this.publicKey = null;
    this.address = null;
    return true;
  }

  // public setLogin(keyFileName, pkData): boolean {
  //   return this.setCurrentTransactor(pkData);
  // }

  private hash(v) {
    return createHash('sha512').update(v).digest('hex');
  }

  public async sendData(action, value) {
    // Encode the payload
    const payload = this.getEncodedPayload(action, value);
    // Create a list of transactions.
    // In our case, there would just be one transaction in the list
    const transactionsList = this.getTransactionsList(payload);
    // Create a list of batches. In our case, one batch only in the list
    const batchList = this.getBatchList(transactionsList);

    // Send the batch to REST API
    // await this.sendToRestAPI(batchList)
    //   .then((resp) => {
    //     console.log('sendToRestAPI response', resp);
    //     return {
    //       payload: payload,
    //       transactionList : transactionsList,
    //       batchList: batchList,
    //       response: resp  };
    //   })
    //   .catch((error) => {
    //     console.log('error here', error);
    //     return error;
    //   });
  }

  // Count button will call this function directly
  // For Count button calls, 'batchListBytes' will be null
  public async sendToRestAPI(batchListBytes): Promise<any> {
    if (batchListBytes == null) {
      // GET state
      return this.getState(this.address)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          return this.getDecodedData(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // POST batch list
      return this.postBatchList(batchListBytes);
    }
  }

  private getDecodedData(responseJSON): string {
    const dataBytes = responseJSON.data;
    const decodedData = new Buffer(dataBytes, 'base64').toString();
    return decodedData;
  }

  /*---------Calls to REST API---------------*/
  // Get state of address from rest api
  private async getState(address): Promise<any> {
    // Complete here
    return window.fetch('http://rest-api/state/' + address, {
      method: 'GET'
    }).then((getResp) => {
      return getResp.json();
    }).then((getRespJson) => {
      const data = getRespJson.data;
    });

  }

  // Post batch list to rest api
  private postBatchList(batchListBytes): Promise<any> {
    // Complete here
    console.log(batchListBytes);
    // return window.fetch('http://localhost:4200/api/batches', {
      return window.fetch(`${this.REST_API_BASE_URL}/batches`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/octet-stream'
      },
      body: batchListBytes
    })
    .then((resp) => {
      console.log('post response', resp);
    })
    .catch((err) => {
      console.log('error in fetch', err);
    });
  }

  /*------END Calls to REST API---------------*/



  /*------Encoding payload---------------------*/

  private getEncodedPayload(action, values): any {
    // Complete here
    const payload = {
      action: action,
      payload: values
    };
    const stringPayload = JSON.stringify(payload);
    const encodedPayload = this.encoder.encode(stringPayload);
    console.log('before', this.address);
    console.log('value', values);

    const valueJSON = JSON.parse(values);
    const valueKeys = Object.keys(valueJSON);
    const important = valueJSON['imp'];
    const docType = valueJSON['docType'];
    const length = important.length;
    const hashLength = Math.floor(58 / length);
    let userHash: String = '';
    important.forEach(element => {
      const impValue = valueJSON[valueKeys[element]];
      const tmp = this.hash(impValue).substr(0, hashLength);
      userHash += tmp;
      console.log(valueKeys[element], ':', impValue, ';', tmp, '->', userHash);
    });

    while (userHash.length < 58) {
      userHash += '0';
    }

    this.address = this.hash(this.FAMILY_NAME).substr(0, 6) + userHash + this.hash(docType).substr(0, 6) ;
    console.log('after', this.address, ';', this.address.length);

    console.log(' payload :', payload, 'enc' , encodedPayload);
    return encodedPayload;
  }

  /*------END Encoding payload-------------------*/


  /*---Signing & Addressing-------------------------*/

  private setCurrentTransactor(pkInput): boolean {
    try {
      // Complete here
      this.context = createContext('secp256k1');
      this.privateKey = Secp256k1PrivateKey.fromHex(pkInput);
      this.signer = new CryptoFactory(this.context).newSigner(this.privateKey);
      this.publicKey = this.signer.getPublicKey().asHex();
      this.address = this.hash(this.FAMILY_NAME).substr(0, 6) + this.hash(this.publicKey).substr(0, 64);
      console.log('setCurrentTransactor', this.privateKey, this.publicKey);
    } catch (e) {
      console.log('Error in reading the key details', e);
      return false;
    }
    return true;
  }

  /*------END Signing & Addressing---------------------*/




  /*-------------Creating transactions & batches-------*/

  private getTransactionsList(payload): any {
    // Complete here
    const nonce = (Math.random() * 1000).toString();
    const tHB = {
      familyName: this.FAMILY_NAME,
      familyVersion: this.FAMILY_VERSION ,
      inputs: [this.address] ,
      outputs: [this.address] ,
      signerPublicKey: this.publicKey ,
      batcherPublicKey: this.publicKey ,
      dependencies: [] ,
      payloadSha512: this.hash(payload) ,
      nonce: nonce ,
    };
    const transactionHeaderBytes = protobuf.TransactionHeader.encode(tHB).finish();
    const signature = this.signer.sign(transactionHeaderBytes);
    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: payload
    });
    const transactions = [transaction];
    console.log('transaction', transaction);
    console.log('tHB', tHB);
    return transactions;
  }

  private getBatchList(transactionsList): any {
    // Complete here

    // batchHeader
    const bHB = {
      signerPublicKey: this.publicKey,
      transactionIds: transactionsList.map((txn) => txn.headerSignature)
    };
    console.log(bHB);
    const batchHeaderBytes = protobuf.BatchHeader.encode(bHB).finish();

    // signature
    const signature = this.signer.sign(batchHeaderBytes);

    // batch
    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      headerSignature: signature,
      transactions: transactionsList
    });

    console.log('Batch:', batch);

    const batchListBytes = protobuf.BatchList.encode({
      batches: [batch]
    }).finish();

    return batchListBytes;
  }

  /*-------END Creating transactions & batches-----------*/

>>>>>>> 5af1c8371d7b6060a69c0a4bf79325cdfd3c3abc
}
