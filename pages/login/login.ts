import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../providers/providers";
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rememberMe: boolean = false;
  email: string = "";//"systemadmin@kmk.com";
  password: string = "";// "systemadmin";
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private storage: Storage, private alert: AlertProvider) {
  }

  ionViewDidLoad() {
    this.storage.get("kmk_rememberMe").then(remember => {
      this.rememberMe = remember;
      if (remember == true) {
        this.storage.get("kmk_email").then(result => {
          if (result) {
            this.email = result;
            this.storage.get("kmk_password").then(pass => {
              if (pass) {
                this.password = pass;
              }
            });
          }
        });
      }
    });
  }

  rememberMeChanged() {
    this.storage.set("kmk_rememberMe", this.rememberMe);
    if (this.rememberMe) {
      this.storage.set("kmk_email", this.email);
      this.storage.set("kmk_password", this.password);
    }
    else {
      this.storage.set("kmk_email", "");
      this.storage.set("kmk_password", "");
    }
  }

  doLogin() {
    if (this.validateInputs()) {
      this.httpCall.post(this.globals.servicesURL.login, {
        "email": this.email,
        "password": this.password,
        "rememberMe": true
      }).subscribe(result => {
        if (result.success) {
          let decoded = this.jwtHelper.decodeToken(result.data.token);
          this.globals.userRule = decoded.Role;
          this.globals.isUserLoggedIn = true;
          this.globals.accessToken = result.data.token;
          this.rememberMeChanged();
          this.httpCall.get(this.globals.servicesURL.user_info, "Info").subscribe(result => {
            this.globals.userInfo = result.data;
            this.navCtrl.setRoot("ProductsPage");
          });
        }
      });
    }
  }

  forgetPassword() {
    this.navCtrl.push("ForgetPasswordPage");
  }

  validateInputs() {
    if (this.email == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "login.username");
      return false;
    }
    // else if (!this.globals.validateEmail(this.email)) {
    //   this.alert.displayErrorToast("suppliers.email-error");
    //   return false;
    // }
    else if (this.password == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "login.password");
      return false;
    }

    return true;
  }
}
