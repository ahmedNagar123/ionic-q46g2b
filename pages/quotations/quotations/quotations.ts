import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";

/**
 * Generated class for the QuotationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotations',
  templateUrl: 'quotations.html',
})
export class QuotationsPage {

  quotations: any = [];
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {

    this.events.unsubscribe("reload:quotations");
    this.events.subscribe("reload:quotations", data => {
      this.getQuotations();
    })
  }

  onInput(val) {
    this.search = val;
    this.offset = 0;
    this.getQuotations();
  }

  ionViewDidLoad() {
    this.getQuotations();
  }

  getQuotations(refresher?) {
    this.httpCall.get(this.globals.servicesURL.quotations, "?Limit=10&Offset=" + this.offset + "&Search=" + this.search).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.quotations = this.quotations.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.quotations = result.data.rows;
      }
    });
  }

  delete(id, index) {
    this.httpCall.delete(this.globals.servicesURL.quotations, "/" + id).subscribe(result => {
      this.quotations.splice(index, 1);
    });
  }

  edit(quot) {
    this.navCtrl.push("AddEditQuotationsPage", { mode: "edit", item: quot });
  }

  next(refresher) {
    this.offset += 10;
    this.getQuotations(refresher);
  }

  add() {
    this.navCtrl.push("AddEditQuotationsPage", { mode: "add" });
  }
}
