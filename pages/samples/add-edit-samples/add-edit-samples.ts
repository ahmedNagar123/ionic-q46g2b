import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddEditSamplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-samples',
  templateUrl: 'add-edit-samples.html',
})
export class AddEditSamplesPage {

  selectedOption: any = "details";
  sample: any = {};
  attachmentsArr: any = [];
  title: string = "";
  attachmentsOffset: number = 0;
  calllDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.sample = this.navParams.data.item;
    this.title = this.translateService.instant("samples.details");
  }

  ionViewDidLoad() {
  }

  segmentChanged(evt) {
    this.calllDone = false;
    if (this.selectedOption == "details") {
      this.title = this.translateService.instant("samples.details");
    }
    else if (this.selectedOption == "attachments") {
      this.title = this.translateService.instant("products.attach");
      if (this.attachmentsArr.length < 1) {
        this.getAttachements();
      }
    }
  }

  getAttachements(refresher?) {
    this.httpCall.get(this.globals.servicesURL.attachements, "?search=&order=asc&offset=" + this.attachmentsOffset + "&limit=10&OwnerEntityId=" + this.sample.id).subscribe(result => {
      this.calllDone = true;
      if (refresher) {
        this.attachmentsArr = this.attachmentsArr.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.attachmentsArr = result.data.rows;
      }
    });
  }

  getDate(date) {
    var _date = new Date(date);
    return _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
  }

  next(refresher) {
    if (this.selectedOption == "details") {
      refresher.complete();
    }
    else if (this.selectedOption == "attachments") {
      this.attachmentsOffset += 10;
      this.getAttachements(refresher);
    }
  }

  download(file) {
    window.open("http://crm.kmkchemicals.com/uploads/" + file.name, "_system");
  }
}
