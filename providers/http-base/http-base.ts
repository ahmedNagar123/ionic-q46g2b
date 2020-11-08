import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { ConfigClass } from "../providers";
import { GlobalProvider } from "../global/global";
import { AlertProvider } from "../alert/alert";

/*
  Generated class for the HttpBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpBaseProvider {

  url = "";
  params: HttpParams;

  constructor(private _http: HttpClient, private globals: GlobalProvider, private alert: AlertProvider) {
  }

  get(serviceObj, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall == true) {
      this.params.append("backgroundCall", "true");
    }
    else {
      this.params = new HttpParams().set('backgroundCall', "false");
    }
    return this._http.get(ConfigClass.getEndpoint + this.url + queryString, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  post(serviceObj, data, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall == true) {
      this.params.append("backgroundCall", "true");
    }
    else {
      this.params = new HttpParams().set('backgroundCall', "false");
    }

    return this._http.post(ConfigClass.getEndpoint + this.url + queryString, data, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  put(serviceObj, data, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall == true) {
      this.params.append("backgroundCall", "true");
    }
    else {
      this.params = new HttpParams().set('backgroundCall', "false");
    }

    return this._http.put(ConfigClass.getEndpoint + this.url + queryString, data, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  delete(serviceObj, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall == true) {
      this.params.append("backgroundCall", "true");
    }
    else {
      this.params = new HttpParams().set('backgroundCall', "false");
    }

    return this._http.delete(ConfigClass.getEndpoint + this.url + queryString, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  uploadAttachment(serviceObj, data) {

    this.alert.displayLoadingSpinner();
    this.url = serviceObj.url;
    return new Promise((resolve, reject) => {

      var oReq = new XMLHttpRequest();
      let formData = new FormData();
      formData.append('file', data.file);
      formData.append('Title', data.title);
      formData.append('OwnerEntityId', data.id);
      formData.append('Notes', data.notes);

      oReq.open("POST", ConfigClass.getUploadEndpoint + this.url, true);
      oReq.setRequestHeader('Authorization', 'Bearer ' + this.globals.accessToken);

      oReq.onload = (oEvent) => {
        // all done!
        if (oReq.status == 200) {
          this.alert.dismissLoadingSpinner();
          resolve(JSON.parse(oReq.response));
        } else {
          this.alert.dismissLoadingSpinner();
          reject(false);
        }
      };
      // Pass the blob in to XHR's send method
      oReq.send(formData);

    });
  }

  uploadContactAttachment(serviceObj, formData, queryString, method) {

    this.alert.displayLoadingSpinner();
    this.url = serviceObj.url;
    return new Promise((resolve, reject) => {

      var oReq = new XMLHttpRequest();
      // let formData = new FormData();
      // formData.append('file', data.file);
      // formData.append('Title', data.title);
      // formData.append('OwnerEntityId', data.id);
      // formData.append('Notes', data.notes);

      oReq.open(method, ConfigClass.getUploadEndpoint + this.url + queryString, true);
      oReq.setRequestHeader('Authorization', 'Bearer ' + this.globals.accessToken);
      oReq.setRequestHeader('enctype', 'multipart/form-data');

      oReq.onload = (oEvent) => {
        // all done!
        if (oReq.status == 200) {
          this.alert.dismissLoadingSpinner();
          resolve(JSON.parse(oReq.response));
        } else {
          this.alert.dismissLoadingSpinner();
          reject(false);
        }
      };
      // Pass the blob in to XHR's send method
      oReq.send(formData);

    });
  }
}
