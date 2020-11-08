import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";

/**
 * Generated class for the SamplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-samples',
  templateUrl: 'samples.html',
})
export class SamplesPage {

  samples: any = [];
  offset: number = 0;
  search: string = "";
  callDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {
  }

  ionViewDidLoad() {
    this.getSamples();
  }

  getSamples(refresher?) {
    this.httpCall.get(this.globals.servicesURL.samples, "/GetCustomerSamples?order=asc&Limit=10&Offset=" + this.offset).subscribe(result => {
      this.callDone = true;
      if (refresher) {
        this.samples = this.samples.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.samples = result.data.rows;
      }
    });
  }

  view(sample) {
    this.navCtrl.push("AddEditSamplesPage", { item: sample });
  }

  viewReport(sample) {
    window.open("http://kmkchemicals.com/Sample-Report/" + sample.id, "_system");
  }

  next(refresher) {
    this.offset += 10;
    this.getSamples(refresher);
  }
}
