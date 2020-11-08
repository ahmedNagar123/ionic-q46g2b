import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../providers/providers";

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  email: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertProvider, private globals: GlobalProvider, private httpCall: HttpBaseProvider) {
  }

  submit() {
    if (this.email == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "login.email");
      return false;
    }
    else if (!this.globals.validateEmail(this.email)) {
      this.alert.displayErrorToast("suppliers.email-error");
      return false;
    }
    else {
      this.httpCall.post(this.globals.servicesURL.users, { "email": this.email }, "/forgot-password").subscribe(result => {
        if (result.success) {
        }
      });
    }
  }
}
