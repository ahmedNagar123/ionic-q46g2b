
import { Injectable, ErrorHandler } from '@angular/core';
import { AlertProvider } from '../alert/alert';
export const ENDPOINT: string = "https://api.kmk.bbdv.xyz/api/v1/";
export const UPLOAD_ENDPOINT: string = "https://api.kmk.bbdv.xyz/api/v1/";
export const AUTHTYPE: string = "#$#$%*@@##m0%%##";
export const TIMEOUT: number = 60000;

@Injectable()
export class ConfigClass {
    static get getEndpoint() {
        return ENDPOINT;
    }

    static get getUploadEndpoint() {
        return UPLOAD_ENDPOINT;
    }

    static get getTimeout() {
        return TIMEOUT;
    }

    static get getAuthType() {
        return AUTHTYPE;
    }
}

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    constructor(private alert: AlertProvider) { }
    handleError(error) {
        console.log(error);
        this.alert.dismissLoadingSpinner();
    }
}