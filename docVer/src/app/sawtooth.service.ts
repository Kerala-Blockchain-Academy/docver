import { Injectable } from '@angular/core';
import { createHash } from 'crypto-browserify';
import { CryptoFactory, createContext } from 'sawtooth-sdk/signing';
import * as protobuf from 'sawtooth-sdk/protobuf';
import {Secp256k1PrivateKey} from 'sawtooth-sdk/signing/secp256k1';
import { TextEncoder, TextDecoder } from 'text-encoding/lib/encoding';
import { Buffer } from 'buffer/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'q';
import { MessageJson, PostResp, StateResponce,  TransactionStatus, Transaction, Payload, TpRequest } from './model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class SawtoothService {
  private signer: any;
  public publicKey: any;
  public privateKey: any;
  private address: any;
  private context: any;
  public loggedInStatus: any;
  status = false;
  public verified = 2;

  private FAMILY_NAME = 'docVer';
  private FAMILY_VERSION = '1.0';

  private encoder = new TextEncoder('utf8');
  private decoder = new TextDecoder('utf8');
  private REST_API_BASE_URL = 'http://localhost:4200/api';
  // private REST_API_BASE_URL = 'http://sawtooth-rest-api:8008';
  private privateKeyHex = '76ad89d0ff29b0267fba72ea8d40ef7975e10f8acde8d50d20cdf56ba9599c5e';
  public payloadData: Payload;

  constructor(private http: HttpClient, private router: Router ) {
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

  public hash(v) {
    return createHash('sha512').update(v).digest('hex');
  }

  public search(data, path) {
    this.address = this.getAddress(data);
    const state = this.getState(this.address).subscribe((stateResp: StateResponce) => {
      console.log(stateResp);
      const decodedData = atob(stateResp.data);
      const transaction = this.getTransaction(decodedData).subscribe(
        (transactionResp: Transaction) => {
          console.log('transaction', transactionResp);
          const transactionData = transactionResp.data;
          const payload = transactionData.payload;
          console.log(payload);
          const payloadDecode = atob(payload);
          const tpRequest: TpRequest = JSON.parse(payloadDecode);
          console.log(tpRequest);
          const payloadJson = JSON.parse(tpRequest.payload);
          this.payloadData = payloadJson;
          console.log(this.payloadData);
        },
        (error) => {
          console.log(error);
         },
        () => {
          this.router.navigate([path]);
        }
      );
    });
  }

  public veryfy(address: string, newHash: string) {
    this.address = address;
    const state = this.getState(this.address).subscribe((stateResp: StateResponce) => {
      console.log(stateResp);
      const decodedData = atob(stateResp.data);
      const transaction = this.getTransaction(decodedData).subscribe(
        (transactionResp: Transaction) => {
          console.log('transaction', transactionResp);
          const transactionData = transactionResp.data;
          const payload = transactionData.payload;
          console.log(payload);
          const payloadDecode = atob(payload);
          const tpRequest: TpRequest = JSON.parse(payloadDecode);
          console.log(tpRequest);
          const payloadJson = JSON.parse(tpRequest.payload);
          this.payloadData = payloadJson;
          const payloadHash = this.hash(payload).substr(64);
          if (payloadHash === newHash) {
            this.verified = 1;
          } else {
            this.verified = 0;
          }
          console.log(this.payloadData);
        },
        (error) => {
          console.log(error);
         },
        () => {
          this.router.navigate(['verifyit']);
        }
      );
    });
  }


  private getDecodedData(responseJSON): string {
    const dataBytes = responseJSON.data;
    const decodedData = new Buffer(dataBytes, 'base64').toString();
    return decodedData;
  }

  /*---------Calls to REST API---------------*/
  // Get state of address from rest api
  private getState(address) {
    return this.http.get<StateResponce>(`${this.REST_API_BASE_URL}/state/${address}`);
  }

  private getTransaction(transactionId) {
    return this.http.get<Transaction>(`${this.REST_API_BASE_URL}/transactions/${transactionId}`);
  }

  private sendBatchList(data) {
    data = data.slice(0, data.length);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/octet-stream' })
    };
    console.log(typeof(data), data);
    return this.http.post<PostResp>(`${this.REST_API_BASE_URL}/batches`, data.buffer , httpOptions);
  }

  private getStatus(response: PostResp) {
    const link = response.link;
        const tmp = link.split('/');
        console.log(tmp);
        const getResp = this.http.get<TransactionStatus>(`${this.REST_API_BASE_URL}/${tmp[3]}`);
        getResp.subscribe((transactionStatus: TransactionStatus) => {
          console.log(transactionStatus.data);
          if (transactionStatus.data[0].status === 'PENDING') {
            delay(300);
            this.getStatus(response);
          }
          if (transactionStatus.data[0].status === 'COMMITTED') {
            return 'COMMITTED';
          }
          if (transactionStatus.data[0].status === 'INVALID') {
          console.log(transactionStatus.data[0].invalid_transactions[0]);
          const message = transactionStatus.data[0].invalid_transactions[0].message;
          const messageJson: MessageJson = JSON.parse(message);
          console.log(messageJson.response);
          return messageJson.response;
          }
          return 'UNKNOWN';
        });
  }



  public register(action, value) {
    const payload = this.getEncodedPayload(action, value);
    const transactionsList = this.getTransactionsList(payload);
    const batchListBytes = this.getBatchList(transactionsList);
    return this.sendBatchList(batchListBytes)
      .subscribe((response) => {
        return this.getStatus(response);
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
    console.log('payload', stringPayload);

    this.address = this.getAddress(values);
    console.log('after', this.address, ';', this.address.length);

    console.log(' payload :', payload, 'enc' , encodedPayload);
    return encodedPayload;
  }

  /*------END Encoding payload-------------------*/


  /*---Signing & Addressing-------------------------*/

  public setCurrentTransactor(pkInput): boolean {
    try {
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


  // creating state address
private getAddress(values) {
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
    return this.address;
}


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

  getPayload() {
    return this.payloadData;
  }

  logger() {
    return this.status;

  }
  /*-------END Creating transactions & batches-----------*/

}
