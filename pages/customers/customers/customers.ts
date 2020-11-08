import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";

/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {

  customers: any = [];
  totalRecords: number = 0;
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {

    this.events.unsubscribe("reload:customers");
    this.events.subscribe("reload:customers", data => {
      this.getCustomers();
    })
  }

  onInput(val) {
    this.search = val;
    this.offset = 0;
    this.getCustomers();
  }

  ionViewDidLoad() {
    this.getCustomers();
  }

  getCustomers(refresher?) {
    this.httpCall.get(this.globals.servicesURL.customers, "?Limit=10&Offset=" + this.offset + "&Search=" + this.search).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.customers = this.customers.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.customers = result.data.rows;
      }
    });
  }

  delete(id, index) {
    this.httpCall.delete(this.globals.servicesURL.customers, "/" + id).subscribe(result => {
      this.customers.splice(index, 1);
    });
  }

  edit(product) {
    this.navCtrl.push("AddEditCustomersPage", { mode: "edit", item: product });
  }

  next(refresher) {
    this.offset += 10;
    this.getCustomers(refresher);
  }

  prev() {
    this.offset -= 10;
    this.getCustomers();
  }

  add() {
    this.navCtrl.push("AddEditCustomersPage", { mode: "add" });
  }
} 
