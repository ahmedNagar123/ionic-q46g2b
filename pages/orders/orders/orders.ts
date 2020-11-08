import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: any = [];
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {

    this.events.unsubscribe("reload:orders");
    this.events.subscribe("reload:orders", data => {
      this.getOrders();
    })
  }

  onInput(val) {
    this.search = val;
    this.offset = 0;
    this.getOrders();
  }

  ionViewDidLoad() {
    this.getOrders();
  }

  getOrders(refresher?) {
    this.httpCall.get(this.globals.servicesURL.orders, "?Limit=10&Offset=" + this.offset + "&Search=" + this.search).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.orders = this.orders.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.orders = result.data.rows;
      }
    });
  }

  delete(id, index) {
    this.httpCall.delete(this.globals.servicesURL.orders, "/" + id).subscribe(result => {
      this.orders.splice(index, 1);
    });
  }

  edit(order) {
    this.navCtrl.push("AddEditOrdersPage", { mode: "edit", item: order });
  }

  next(refresher) {
    this.offset += 10;
    this.getOrders(refresher);
  }

  add() {
    this.navCtrl.push("AddEditOrdersPage", { mode: "add" });
  }
}
