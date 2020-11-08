import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider, alertFields } from "../../providers/providers";

/**
 * Generated class for the SendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'send',
  templateUrl: 'send.html'
})
export class SendComponent {

  title: string = "";
  message: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpCall: HttpBaseProvider,
    private globals: GlobalProvider, private alert: AlertProvider, private modal: ViewController) {
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
        this.cancel();
      });
    }
  }

  cancel() {
    this.modal.dismiss();
  }
}
