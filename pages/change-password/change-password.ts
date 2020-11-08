import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../providers/providers";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  oldPass: string = "";
  password: string = "";
  rePassword: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertProvider, private globals: GlobalProvider, private httpCall: HttpBaseProvider) {
  }

  reset() {
    if (this.oldPass == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "login.email");
      return false;
    }
    else if (this.password == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "login.password");
      return false;
    }
    else if (this.rePassword == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "customers.re-password");
      return false;
    }
    else if (this.password != this.rePassword) {
      this.alert.displayErrorToast("pass-error.change-pass");
      return false;
    }
    else {
      this.httpCall.post(this.globals.servicesURL.users, { "currentPassword": this.oldPass, "password": this.password, "confirmPassword": this.rePassword }, "/change-password").subscribe(result => {
        if (result.success) {
          this.oldPass = "";
          this.password = "";
          this.rePassword = "";
          this.alert.displayToast("change-pass.success");
        }
      });
    }
  }
}
