import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";

/**
 * Generated class for the OpportunitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html',
})
export class OpportunitiesPage {

  opportunities: any = [];
  totalRecords: number = 0;
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {

    this.events.unsubscribe("reload:opportunities");
    this.events.subscribe("reload:opportunities", data => {
      this.getOpportunities();
    })
  }

  onInput(val) {
    this.search = val;
    this.offset = 0;
    this.getOpportunities();
  }

  ionViewDidLoad() {
    this.getOpportunities();
  }

  getOpportunities(refresher?) {
    this.httpCall.get(this.globals.servicesURL.user_info, "GetOpportunities?order=asc&Limit=10&Offset=" + this.offset).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.opportunities = this.opportunities.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.opportunities = result.data.rows;
      }
    });
  }

  getDate(date) {
    var _date = new Date(date);
    return _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
  }

  edit(item) {
    this.navCtrl.push("AddEditOpportunitiesPage", { mode: "edit", item: item });
  }

  next(refresher) {
    this.offset += 10;
    this.getOpportunities(refresher);
  }

  prev() {
    this.offset -= 10;
    this.getOpportunities();
  }

  add() {
    this.navCtrl.push("AddEditOpportunitiesPage", { mode: "add" });
  }

  getOrigin(id) {
    switch (id.toString()) {
      case "1":
        return "opportunities.email-received";
      case "2":
        return "opportunities.phone-received";
      case "3":
        return "opportunities.fax-received";
      case "4":
        return "opportunities.phone-made";
      case "5":
        return "opportunities.trender-list";
      case "6":
        return "opportunities.trender-invitation";
      case "7":
        return "opportunities.visit-made";
      case "8":
        return "opportunities.other";
    }
  }
}
