import { Injectable } from "@angular/core";
import { AlertController, ToastController, LoadingController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { TranslateProvider } from "../translate/translate";

@Injectable()
export class AlertProvider {

    toast: any;
    spinner: any;
    basicAlert: any;
    isLogoutToast: boolean = false;

    constructor(private alertCtrl: AlertController, private translateService: TranslateService,
        private toastCtrl: ToastController, private loaderCtrl: LoadingController, private language: TranslateProvider) {
    }

    displayBasicAlert(messageKey: string, title = "general.title", okBtn = "general.ok") {
        return new Promise((resolve, reject) => {
            if (this.basicAlert != null) {
                this.basicAlert.dismiss().catch(() => { });
            }
            this.basicAlert = this.alertCtrl.create({
                enableBackdropDismiss: false,
            });

            this.translateService.get([messageKey, title, okBtn]).subscribe(
                value => {
                    this.basicAlert.setMessage(value[messageKey]);
                    this.basicAlert.setTitle(value[title]);
                    this.basicAlert.addButton({
                        text: value[okBtn],
                        handler: data => {
                            resolve(data);
                        }
                    });
                    this.basicAlert.present();
                }
            );
        });
    }

    dismissBasicAlert() {
        if (this.basicAlert != null) {
            this.basicAlert.dismiss().catch(() => { });
        }
    }

    displayConfirmAlert(alertObj: alertFields) {
        return new Promise((resolve, reject) => {
            this.translateService.get([alertObj.title, alertObj.message, alertObj.ok, alertObj.cancel]).subscribe(
                value => {
                    let alert = this.alertCtrl.create({
                        enableBackdropDismiss: false,
                        title: value[alertObj.title],
                        message: value[alertObj.message],
                        buttons: [{
                            text: value[alertObj.cancel],
                            role: "cancel"
                        }, {
                            text: value[alertObj.ok],
                            handler: data => {
                                resolve(data);
                            }
                        }]
                    });
                    alert.present();
                }
            );
        });
    }

    displayErrorToast2(messageKey1, messageKey2, messageKey3 = "") {
        this.closeToast();
        this.translateService.get([messageKey1, messageKey2, messageKey3, "general.toast-close"]).subscribe(
            value => {
                this.toast = this.toastCtrl.create({
                    message: value[messageKey1] + value[messageKey2] + value[messageKey3],
                    position: 'top',
                    showCloseButton: true,
                    closeButtonText: value["general.toast-close"],
                    cssClass: "errorToastClass",
                    dismissOnPageChange: true
                });
                this.toast.present();
            }
        );
    }

    displayErrorToast(messageKey, isLogout = false) {

        if (!this.isLogoutToast) {
            this.closeToast();
        }

        this.translateService.get([messageKey, "general.toast-close"]).subscribe(
            value => {
                this.toast = this.toastCtrl.create({
                    message: value[messageKey],
                    position: 'top',
                    showCloseButton: true,
                    closeButtonText: value["general.toast-close"],
                    cssClass: "errorToastClass"
                    // dismissOnPageChange: true
                });

                this.toast.onDidDismiss(() => {
                    this.isLogoutToast = false;
                });
                if (!this.isLogoutToast || !isLogout) {
                    if (this.toast != null) {
                        this.closeToast();
                    }
                    this.toast.present();
                }
                this.isLogoutToast = isLogout;
            }
        );
    }

    displayValidationErrorToast(messageKey, messageKey2) {

        this.translateService.get([messageKey, messageKey2, "general.toast-close"]).subscribe(
            value => {
                this.toast = this.toastCtrl.create({
                    message: value[messageKey] + value[messageKey2],
                    position: 'top',
                    showCloseButton: true,
                    closeButtonText: value["general.toast-close"],
                    cssClass: "errorToastClass"
                });
                if (this.toast != null) {
                    this.closeToast();
                }
                this.toast.present();
                this.toast.onDidDismiss(() => {
                    this.isLogoutToast = false;
                });
            }
        );
    }

    closeToast() {
        if (this.toast != null) {
            this.toast.dismiss().catch(() => { });
            // this.toast = null;
        }
    }

    displayLoadingSpinner() {
        if (this.spinner == null) {
            this.spinner = this.loaderCtrl.create({
                spinner: "bubbles"
            });
            this.spinner.present();
        }
    }

    dismissLoadingSpinner() {
        try {
            this.spinner.dismiss().catch(() => { });
            this.spinner = null;
        }
        catch (e) { }
    }

    displayOptionAlert(alertObj: alertFields, optionObj: alertOption[], cssClass?: string) {
        return new Promise((resolve, reject) => {
            this.translateService.get([alertObj.title, alertObj.message, alertObj.ok, alertObj.cancel]).subscribe(
                value => {
                    let alert = this.alertCtrl.create({
                        enableBackdropDismiss: false,
                        title: value[alertObj.title],
                        inputs: optionObj,
                        cssClass: cssClass ? cssClass : null,
                        buttons: [{
                            text: value[alertObj.cancel],
                            role: "cancel"
                        }, {
                            text: value[alertObj.ok],
                            handler: data => {
                                resolve(data);
                            }
                        }]
                    });
                    alert.present();
                }
            );
        });
    }

    displayLanguageAlert() {
        return new Promise((resolve, reject) => {

            this.translateService.get(["general.change-language", "general.cancel", "general.ok"]).subscribe(
                value => {
                    let isArabic: boolean = true;
                    if (this.language.getCurrentLang() == "en") {
                        isArabic = false;
                    }
                    let alert = this.alertCtrl.create({
                        title: value["general.change-language"],
                        inputs: [{
                            type: "radio",
                            label: "English",
                            value: "en",
                            checked: !isArabic
                        }, {
                            type: 'radio',
                            label: 'عربى',
                            value: 'ar',
                            checked: isArabic
                        }],
                        buttons: [{
                            text: value["general.cancel"],
                            role: "cancel"
                        }, {
                            text: value["general.ok"],
                            handler: data => {
                                if (this.language.getCurrentLang() != data) {
                                    this.language.changeLang();
                                    setTimeout(function () {
                                        resolve(true);
                                    }, 40);
                                }
                            }
                        }]
                    });
                    alert.present();
                }
            );
        });
    }

    displayToast(msg) {
        this.translateService.get([msg]).subscribe(
            value => {
                this.toast = this.toastCtrl.create({
                    message: value[msg],
                    duration: 2500,
                    position: "top",
                    cssClass: "success-toast"
                });
                this.toast.present();
            });
    }
}

@Injectable()
export class alertFields {
    title: string;
    message: string;
    cancel: string;
    ok: string;
}

@Injectable()
export class alertOption {
    type: string;
    label: string;
    value: string;
    checked: boolean;
}