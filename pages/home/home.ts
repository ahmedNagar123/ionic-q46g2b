import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/providers";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private globals: GlobalProvider, private menu: MenuController) {
  }

  ionViewDidLoad() {
  }

  onInput(val) {
    debugger
    var s = val;
  }

  workplace() {
    this.globals.activeTab = "workplace";
    this.menu.toggle();
  }

  reports() {
    this.globals.activeTab = "reports";
    this.menu.toggle();
  }

  options() {
    this.globals.activeTab = "options";
    this.menu.toggle();
  }

  financial() {
    this.globals.activeTab = "financial";
    this.menu.toggle();
  }

  setupMenu() {
    this.menu.toggle();
  }
}
