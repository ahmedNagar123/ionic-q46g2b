import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";
/**
 * Generated class for the ShipmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shipments',
  templateUrl: 'shipments.html',
})
export class ShipmentsPage {

  shipments: any = [];
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {
    this.events.unsubscribe("reload:shipments");
    this.events.subscribe("reload:shipments", data => {
      this.getShipments();
    })
  }

  ionViewDidLoad() {
    this.getShipments();
  }

  onInput(val) {
    this.search = val;
    this.offset = 0;
    this.getShipments();
  }

  getShipments(refresher?) {
    this.httpCall.get(this.globals.servicesURL.shipments, "?Limit=10&Offset=" + this.offset + "&Search=" + this.search).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.shipments = this.shipments.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.shipments = result.data.rows;
      }
    });
  }

  delete(id, index) {
    this.httpCall.delete(this.globals.servicesURL.shipments, "?id=" + id).subscribe(result => {
      this.shipments.splice(index, 1);
    });
  }

  edit(sample) {
    this.navCtrl.push("AddEditShipmentsPage", { mode: "edit", item: sample });
  }

  next(refresher) {
    this.offset += 10;
    this.getShipments(refresher);
  }

  add() {
    this.navCtrl.push("AddEditShipmentsPage", { mode: "add" });
  }

}
