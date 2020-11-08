import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddEditQuotationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-quotations',
  templateUrl: 'add-edit-quotations.html',
})
export class AddEditQuotationsPage {

  orders: any = [];
  file: any = {};
  attachName: string = "";
  attachmentsArr: any = [];
  quotation: any = {};
  selectedOption: any = "details";
  ordersOffset: number = 0;
  title: string = "";
  calllDone: boolean = false;
  attachmentsOffset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.quotation = this.navParams.data.item;
    this.title = this.translateService.instant("quotations.details");
    this.getQuotationDetails();
  }

  getQuotationDetails() {
    this.httpCall.get(this.globals.servicesURL.quotations, "/Quotation-details/" + this.quotation.id).subscribe(result => {
      if (result.success) {
        this.quotation = result.data;
      }
    });
  }

  segmentChanged(evt) {
    this.calllDone = false;
    if (this.selectedOption == "details") {
      this.title = this.translateService.instant("quotations.details");
    }
    else if (this.selectedOption == "orders") {
      this.title = this.translateService.instant("orders.title");
      if (this.orders.length < 1) {
        this.getOrders();
      }
    }
    else if (this.selectedOption == "attachments") {
      this.title = this.translateService.instant("products.attach");
      if (this.attachmentsArr.length < 1) {
        this.getAttachements();
      }
    }
  }

  getOrders(refresher?) {
    this.httpCall.get(this.globals.servicesURL.quot_orders, "/GetOrders/" + this.quotation.id + "?order=asc&offset=" + this.ordersOffset + "&limit=10").subscribe(result => {
      this.calllDone = true;
      if (refresher) {
        this.orders = this.orders.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.orders = result.data.rows;
      }
    });
  }

  getDate(date) {
    var _date = new Date(date);
    return _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
  }

  viewOrder(order) {
    this.navCtrl.push("AddEditOrdersPage", { mode: "edit", item: order });
  }

  next(refresher) {
    if (this.selectedOption == "details") {
      refresher.complete();
    }
    else if (this.selectedOption == "orders") {
      this.ordersOffset += 10;
      this.getOrders(refresher);
    }
    else if (this.selectedOption == "attachments") {
      this.attachmentsOffset += 10;
      this.getAttachements(refresher);
    }
  }

  getAttachements(refresher?) {
    this.httpCall.get(this.globals.servicesURL.attachements, "?Limit=10&OwnerEntityId=" + this.quotation.id).subscribe(result => {
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

  getCurrency(code) {
    return code == 1 ? "quotations.USD" : "quotations.EGP";
  }

  getIntern(code) {
    switch (code) {
      case 1:
        return "CIF";
      case 2:
        return "CF";
      case 3:
        return "FOB";
      case 4:
        return "Other";
      case 5:
        return "Ex_Works";
      case 6:
        return "FCA";
      case 7:
        return "FAS";
      case 8:
        return "CPT";
      case 9:
        return "CFR";
      case 10:
        return "CIP";
      case 11:
        return "DAT";
      case 12:
        return "DAP";
      case 13:
        return "DDP";
      default:
        return code;
    }
  }

  download(file) {
    window.open("http://crm.kmkchemicals.com/uploads/" + file.name, "_system");
  }
}
