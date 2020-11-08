import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/providers";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userData: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalProvider) {
    this.userData = this.globals.userInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
