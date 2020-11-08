import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider, alertFields } from "../../providers/providers";
import { SendComponent } from "../../components/send/send";

/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  messagesArr: any = [];
  callDone: boolean = false;
  offset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getMessages();
  }

  getMessages(refresher?) {
    if (this.messagesArr.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.user_info, "Inbox?receiver=" + this.globals.userInfo.email + "&order=asc&Limit=10&Offset=" + this.offset).subscribe(result => {
        this.callDone = true;
        if (result.success) {
          if (refresher) {
            this.messagesArr = this.messagesArr.concat(result.data.rows);
            refresher.complete();
          }
          else {
            this.messagesArr = result.data.rows;
          }
        }
      });
    }
  }

  next(refresher) {
    this.offset += 10;
    this.getMessages(refresher);
  }

  getDate(date) {
    var _date = new Date(date);
    return _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
  }

  reply() {
    const modal = this.modalCtrl.create(SendComponent);
    modal.present();
  }
}
