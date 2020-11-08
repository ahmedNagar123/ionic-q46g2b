import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider, alertFields } from "../../providers/providers";

/**
 * Generated class for the SendMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-message',
  templateUrl: 'send-message.html',
})
export class SendMessagePage {

  title: string = "";
  message: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpCall: HttpBaseProvider,
    private globals: GlobalProvider, private alert: AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMessagePage');
  }

  send() {
    if (this.title == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "messages.title");
      return false;
    }
    else if (this.message == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "messages.message");
      return false;
    }
    else {
      this.httpCall.post(this.globals.servicesURL.user_info, { title: this.title, text: this.message }, "SendMessage").subscribe(result => {
        this.title = this.message = "";
        this.alert.displayToast("messages.success");
      });
    }
  }
}
