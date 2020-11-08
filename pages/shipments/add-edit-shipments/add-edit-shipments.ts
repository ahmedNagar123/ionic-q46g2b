import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddEditShipmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-shipments',
  templateUrl: 'add-edit-shipments.html',
})
export class AddEditShipmentsPage {

  mode: string = "";
  title: string = "";
  selectedOption: string = "details";
  file: any = {};
  attachName: string = "";
  attachmentsArr: any = [];
  attachTitle: string = "";
  attachNotes: string = "";
  shipment: any = {};
  shipmentTitle: string = "";
  orderNo: string = "";
  selectedSupplier: any = {};
  suppliers: any = [];
  shipmentDate: string = "";
  departureDate: string = "";
  invoiceNumber: string = "";
  invoiceDate: string = "";
  selectedCurrency: any = {};
  currenciesArr: any = [{ key: 1, value: "quotations.USD" }, { key: 2, value: "quotations.EGP" }];
  totalAmount: number = 0;
  totalMeas: string = "";
  totalGW: string = "";
  destinationsArr: any = [];
  selectedDestination: any = {};
  selectedPortShipment: any = {};
  freightTerms: any = [];
  selectedFreight: any = {};
  carriers: any = [];
  selectedCarrier: any = {};
  packing: string = "";
  lcNumber: string = "";
  blNumber: string = "";
  ETA: string = "";
  AWB: string = "";
  shipmentData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.mode = this.navParams.data.mode;
    if (this.mode == "edit") {
      this.shipment = this.navParams.data.item;
      this.getShipmentDetails();
    }
  }

  getShipmentDetails() {
    this.httpCall.get(this.globals.servicesURL.shipments, "/" + this.shipment.id).subscribe(result => {
      if (result.success) {
        this.shipmentData = result.data;
        this.shipmentTitle = result.data.title;
        this.orderNo = result.data.orderNumber;
        this.selectedSupplier.id = result.data.supplierId;
        this.shipmentDate = result.data.shipmentDate;
        this.departureDate = result.data.departureDate;
        this.invoiceNumber = result.data.invoiceNumber;
        this.invoiceDate = result.data.invoiceDate;
        this.selectedCurrency.key = result.data.currency;
        this.totalAmount = result.data.totalAmount;
        this.totalMeas = result.data.totalMeas;
        this.totalGW = result.data.totalGW;
        this.selectedDestination.id = result.data.portOfDestintionId;
        this.selectedPortShipment.id = result.data.portOfShipmentId;
        this.selectedFreight.id = result.data.freightTermId;
        this.selectedCarrier.id = result.data.carrierId;
        this.packing = result.data.packing;
        this.lcNumber = result.data.lcNumber;
        this.blNumber = result.data.blNumber;
        this.ETA = result.data.eta;
        this.AWB = result.data.awb;

        this.title = this.translateService.instant("general.edit") + " " + this.shipmentTitle;
        this.getSuppliers();
        this.getPorts();
        this.getFreightTerms();
        this.getCarriers();

        var temp;
        temp = this.currenciesArr.filter(item => {
          if (item.key == this.selectedCurrency.key) {
            return item;
          }
        });
        if (temp.length > 0) {
          this.selectedCurrency = temp[0];
        }
      }
    });
  }

  save() {
    if (this.validateInputs()) {
      var data: any = {};
      data.title = this.shipmentTitle;
      data.orderCode = this.shipmentData.orderCode; //
      data.customer = this.shipmentData.customer; //
      data.shipmentDate = this.shipmentDate;
      data.departureDate = this.departureDate;
      data.totalAmount = this.totalAmount;
      data.currency = this.selectedCurrency.key;
      data.lcNumber = this.lcNumber;
      data.blNumber = this.blNumber;
      data.packing = this.packing;
      data.totalMeas = this.totalMeas;
      data.carrierId = this.selectedCarrier.id;
      data.carrierName = this.selectedCarrier.name;
      data.supplierId = this.selectedSupplier.id;
      data.portOfShipmentId = this.selectedPortShipment.id;
      data.portOfShipmentName = this.selectedPortShipment.name;
      data.portOfDestintionId = this.selectedDestination.id;
      data.portOfDestintionName = this.selectedDestination.name;
      data.orderId = this.shipmentData.orderId; //
      data.freightTermId = this.selectedFreight.id;
      data.eta = this.ETA;
      data.awb = this.AWB;
      data.invoiceNumber = this.invoiceNumber;
      data.invoiceDate = this.invoiceDate;
      data.reference = this.shipmentData.reference; //
      // "status": 0,
      data.totalGW = this.totalGW;
      // "modifiedOn": "2019-01-25T14:27:27.639Z",
      // "modifiedBy": "string",
      // "customerContactName": "string",
      // "customerContactTitle": "string",
      // "customerAddress": "string",
      // "customerPhone": "string",
      // "customerSite": "string",
      // "qIncoTerms": "string",
      // "qshipmentMethod": "string",
      // "qDestinationName": "string",
      data.orderNumber = this.orderNo;

      if (this.mode == "add") {
        this.httpCall.post(this.globals.servicesURL.shipments, data).subscribe(result => {
          this.handleSuccess(result);
        });
      }
      else {
        data.id = this.shipment.id;
        this.httpCall.put(this.globals.servicesURL.shipments, data).subscribe(result => {
          this.handleSuccess(result);
        });
      }
    }
  }

  handleSuccess(result) {
    if (result.success) {
      this.alert.displayToast("general.success");
      this.events.publish("reload:shipments");
      this.navCtrl.pop();
    }
  }

  validateInputs() {

    if (this.shipmentTitle == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.ship-title");
      return false;
    }
    else if (this.selectedSupplier.id == undefined || this.selectedSupplier.id == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "samples.supplier");
      return false;
    }
    else if (this.shipmentDate == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "shipments.ship-date");
      return false;
    }
    else if (this.invoiceNumber == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.inv-num");
      return false;
    }
    else if (this.invoiceDate == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.inv-date");
      return false;
    }
    else if (this.selectedCurrency.key == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "quotations.currency");
      return false;
    }
    else if (this.totalAmount == 0) {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.total-amount");
      return false;
    }
    else if (this.totalGW == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.total-GW");
      return false;
    }
    else if (this.selectedPortShipment.id == undefined || this.selectedPortShipment.id == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "shipments.port-shipment");
      return false;
    }
    else if (this.selectedDestination.id == undefined || this.selectedDestination.id == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "shipments.port-destination");
      return false;
    }
    else if (this.selectedFreight.name == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "shipments.freight");
      return false;
    }
    else if (this.selectedCarrier.name == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "shipments.carrier");
      return false;
    }
    else if (this.packing == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "quotations.packing");
      return false;
    }
    else if (this.lcNumber == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.LCNumber");
      return false;
    }
    else if (this.blNumber == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.BLNumber");
      return false;
    }
    else if (this.ETA == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.ETA");
      return false;
    }
    else if (this.AWB == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "shipments.AWB");
      return false;
    }

    return true;
  }


  getSuppliers() {
    this.httpCall.get(this.globals.servicesURL.suppliers, "?Limit=1000000").subscribe(result => {
      this.suppliers = result.data.rows;
      var temp = this.suppliers.filter(item => {
        if (item.id == this.selectedSupplier.id) {
          return item;
        }
      });
      if (temp.length > 0) {
        this.selectedSupplier = temp[0];
      }
    });
  }

  getFreightTerms() {
    this.httpCall.get(this.globals.servicesURL.shipments, "/FreightTerms").subscribe(result => {
      this.freightTerms = result.data;
      var temp = this.freightTerms.filter(item => {
        if (item.id == this.selectedFreight.id) {
          return item;
        }
      });
      if (temp.length > 0) {
        this.selectedFreight = temp[0];
      }
    });
  }

  getCarriers() {
    this.httpCall.get(this.globals.servicesURL.shipments, "/Carriers").subscribe(result => {
      this.carriers = result.data;
      var temp = this.carriers.filter(item => {
        if (item.id == this.selectedCarrier.id) {
          return item;
        }
      });
      if (temp.length > 0) {
        this.selectedCarrier = temp[0];
      }
    });
  }

  getPorts(refresher?) {
    this.httpCall.get(this.globals.servicesURL.shipments, "/Ports").subscribe(result => {
      this.destinationsArr = result.data;
      var temp = this.destinationsArr.filter(item => {
        if (item.id == this.selectedDestination.id) {
          return item;
        }
      });
      if (temp.length > 0) {
        this.selectedDestination = temp[0];
      }

      temp = this.destinationsArr.filter(item => {
        if (item.id == this.selectedPortShipment.id) {
          return item;
        }
      });
      if (temp.length > 0) {
        this.selectedPortShipment = temp[0];
      }

    });
  }

  segmentChanged(evt) {
    if (this.selectedOption == "attachments") {
      if (this.attachmentsArr.length < 1) {
        this.getAttachements();
      }
      setTimeout(() => {
        document.getElementById("attach-container").style.height = window.screen.height * .75 + "px";
        var input = document.getElementById("fileInput");
        input.addEventListener('change', ($event: any) => {
          this.file = $event.srcElement.files[0];
          if (this.file != undefined) {
            this.attachName = this.file.name;
          }
        });
      }, 100);
    }
  }

  saveAttach() {
    if (this.attachTitle == "") {
      this.alert.displayErrorToast("general.file-title");
      return false;
    }
    if (this.file.name != undefined) {
      var data = {
        file: this.file,
        title: this.attachTitle,
        id: this.shipment.id,
        notes: this.attachNotes
      };
      this.httpCall.uploadAttachment(this.globals.servicesURL.upload, data).then(result => {
        this.alert.displayToast("general.file-success");
        this.attachmentsArr.push({
          name: this.file.name,
          title: this.attachTitle,
          notes: this.attachNotes
        });
        this.file = {};
        this.attachTitle = this.attachName = this.attachNotes = "";
      });
    }
    else {
      this.alert.displayErrorToast("general.file-error");
    }
  }

  deleteFile(index) {
    this.httpCall.delete(this.globals.servicesURL.attachements, "/" + this.attachmentsArr[index].id).subscribe(result => {
      this.attachmentsArr.splice(index, 1);
    });
  }

  getAttachements() {
    this.httpCall.get(this.globals.servicesURL.attachements, "?Limit=1000000&OwnerEntityId=" + this.shipment.id).subscribe(result => {
      this.attachmentsArr = result.data.rows;
    });
  }
}
