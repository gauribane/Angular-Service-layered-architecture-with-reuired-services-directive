import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Config } from './../config/config'
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import {CryptoService} from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * @baseUrl { string } assign apit url 
   * @user { any }
   */
  baseUrl: string = Config.API_URL;
  user: any;
  ipAddress: any;
  deviceInfo = null;
  key:any;

  /**
   * @constructor
   * @param http HttpClient instance
   * @param router Router instance
   */
  constructor(private http: HttpClient,
    private router: Router,
    public deviceService: DeviceDetectorService,
    public cryptoService: CryptoService) {

     

   
     }




  /**
   * @Function postData
   * This is common function to call(post) api to get data by decrypting token
   * @param apiName apiName
   * @param data 
   * @Member token - token to call api
   */


  postData(apiName, headerFlag, data) {
    var Token;
    let headers,encryptedApi,encryptedData;
    if (headerFlag) {
      var tokenData = localStorage.getItem('accessToken')
      if (tokenData) {
        Token = JSON.parse(tokenData);//res
        headers = { auth: Token };
      }
      else
        return;
    }
      encryptedApi=this.cryptoService.encryptData(apiName,'ApiName');
     encryptedData=this.cryptoService.encryptData(data,'Data')
    return this.http.post(this.baseUrl + encryptedApi,encryptedData, { headers: headers, observe: 'response' })
    // return this.http.post(this.baseUrl + apiName,data, { headers: headers, observe: 'response' })
      .pipe(map((data: HttpResponse<any>) => {
        var decryptedData;
          decryptedData= this.cryptoService.decryptData(data.body.encrypted_res);
     
        if (decryptedData.status.code != '00') {
          return decryptedData;
        }
        else if (decryptedData.result) {
          var accessToken = decryptedData.result.token;
          if (accessToken) {
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
          }
          return decryptedData;
        }
        else {
          return decryptedData;
        }
      }));
  }



}

