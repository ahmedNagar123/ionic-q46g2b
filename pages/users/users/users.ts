import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: any = [];
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {
    this.events.unsubscribe("reload:users");
    this.events.subscribe("reload:users", data => {
      this.getUsers();
    })
  }

  ionViewDidLoad() {
    this.getUsers();
  }

  onInput(val) {
    this.search = val;
    this.offset = 0;
    this.getUsers();
  }

  getUsers(refresher?) {
    this.httpCall.get(this.globals.servicesURL.users, "/list-all?Limit=10&Offset=" + this.offset + "&Search=" + this.search).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.users = this.users.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.users = result.data.rows;
      }
    });
  }

  delete(id, index) {
    this.httpCall.delete(this.globals.servicesURL.users, "/" + id).subscribe(result => {
      this.users.splice(index, 1);
    });
  }

  edit(product) {
    this.navCtrl.push("AddEditUsersPage", { mode: "edit", item: product });
  }

  next(refresher) {
    this.offset += 10;
    this.getUsers(refresher);
  }
 
  add() {
    this.navCtrl.push("AddEditUsersPage", { mode: "add" });
  }
}
