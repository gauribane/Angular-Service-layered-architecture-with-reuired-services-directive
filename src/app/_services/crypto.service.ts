import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Config } from './../config/config'

@Injectable({
  providedIn: 'root'
})

/**
 * This is common class to encrypt & decrypt data.
 */
export class CryptoService {
  key: string = Config.Encryption_Key;
  
 
  constructor() { }

  /**
   * This is common function to make a proper request JSON format & encrypt it.
   *@param data- required data to encrypt sent from component.
   */

  encryptData(data,callerName) {
    
    var dataString = JSON.stringify(data);
    var token = CryptoJS.AES.encrypt(dataString, this.key);
    if(callerName=='ApiName'){
      console.log("ApiName",data)
     return token.toString() ;
    }
    else{
      console.log("Req_dat",data);
     return { encrypted_req: token.toString() };
    }
  }

  /**
  * This is common function to decrypt response.
  *@param data- required data to decrypt sent from api service.
  */
  decryptData(data) {
    var decrypted = CryptoJS.AES.decrypt(data, this.key);
    //Here we are checking for decrypted response.
    if (decrypted) {
      var userinfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      console.log("userinfo",userinfo)
      return userinfo;
    }
    else {
      return { "userinfo": { "error": "Please send proper token" } };
    }
  }
}
