import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddEditOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-orders',
  templateUrl: 'add-edit-orders.html',
})
export class AddEditOrdersPage {



  shipmentsArr: any = [];
  file: any = {};
  attachName: string = "";
  attachmentsArr: any = [];
  fileNotes: string = "";
  attachTitle: string = "";
  selectedOption: string = "details";
  order: any = {};
  title: string = "";
  statusArr: any = ["samples.in-progress", "samples.completed", "samples.cancelled"];
  shipmentOffset: number = 0;
  calllDone: boolean = false;
  attachmentsOffset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.order = this.navParams.data.item;
    this.title = this.translateService.instant("orders.details");
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.httpCall.get(this.globals.servicesURL.orders, "/details/" + this.order.id).subscribe(result => {
      if (result.success) {
        this.order = result.data;
      }
    });
  }

  segmentChanged() {
    this.calllDone = false;
    if (this.selectedOption == "details") {
      this.title = this.translateService.instant("orders.details");
    }
    else if (this.selectedOption == "shipments") {
      this.title = this.translateService.instant("shipments.title");
      if (this.shipmentsArr.length < 1) {
        this.getShipments();
      }
    }
    else if (this.selectedOption == "attachments") {
      this.title = this.translateService.instant("products.attach");
      if (this.attachmentsArr.length < 1) {
        this.getAttachements();
      }
    }
  }

  getShipments(refresher?) {
    this.httpCall.get(this.globals.servicesURL.shipments, "/GetShipments/" + this.order.id + "?order=asc&offset=" + this.shipmentOffset + "&limit=10").subscribe(result => {
      this.calllDone = true;
      if (refresher) {
        this.shipmentsArr = this.shipmentsArr.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.shipmentsArr = result.data.rows;
      }
    });
  }

  getAttachements(refresher?) {
    this.httpCall.get(this.globals.servicesURL.attachements, "?Limit=10&OwnerEntityId=" + this.order.id).subscribe(result => {
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

  next(refresher) {
    if (this.selectedOption == "details") {
      refresher.complete();
    }
    else if (this.selectedOption == "shipments") {
      this.shipmentOffset += 10;
      this.getShipments(refresher);
    }
    else if (this.selectedOption == "attachments") {
      this.attachmentsOffset += 10;
      this.getAttachements(refresher);
    }
  }

  getOrderStatus(status) {
    return this.statusArr[status - 1];
  }

  getDate(date) {
    var _date = new Date(date);
    return _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
  }

  viewReport(item) {
    // this.httpCall.get(this.globals.servicesURL.shipments, "/Report/" + item.id).subscribe(result => {
    //   debugger
    // });
     window.open("http://kmkchemicals.com/Shipment/Report/" + item.id, "_system");
  }

  download(item) {
    window.open("http://crm.kmkchemicals.com/uploads/" + item.name, "_system");
  }

  viewShipmentDetails(item)
  {
    
  }
}
