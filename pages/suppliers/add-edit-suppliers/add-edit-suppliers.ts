import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider, alertFields } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddEditSuppliersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-suppliers',
  templateUrl: 'add-edit-suppliers.html',
})
export class AddEditSuppliersPage {

  supplier: any = {};
  products: any = [];
  title: string = "";
  selectedOption: any = "details";
  providerDetails: any = {};
  callDone: boolean = false;
  supplierContacts: any = [];
  contactsOffset: number = 0;
  productsOffset: number = 0;
  attachments: any = [];
  arrachmentsOffset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService, private modal: ModalController) {
    this.supplier = this.navParams.data.item;
    this.getSupplierDetails();
  }

  ionViewDidLoad() {

  }

  getSupplierDetails() {
    this.httpCall.get(this.globals.servicesURL.provider, "/" + this.supplier.id).subscribe(result => {
      this.providerDetails = result.data;
    });
  }

  segmentChanged(evt) {
    this.callDone = false;
    if (this.selectedOption == "details") {
      this.title = this.translateService.instant("suppliers.details");
    }
    else if (this.selectedOption == "contacts") {
      this.title = "contacts.list";
      this.getContacts();
    }
    else if (this.selectedOption == "products") {
      this.title = "products.list";
      this.getProducts();
    }
    else if (this.selectedOption == "attachments") {
      this.title = "products.attach-list";
      this.getAttachments();
    }
  }

  getContacts(refresher?) {
    // var url = "/Supplier?";
    // if (this.globals.userRule.toLowerCase() == "supplier") {
    //   url = "/Customer?";
    // }
    if (this.supplierContacts.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.user_info, "contacts/" + this.supplier.id + "?order=asc&Limit=10&Offset=" + this.contactsOffset).subscribe(result => {
        this.callDone = true;
        if (result.success) {
          if (refresher) {
            this.supplierContacts = this.supplierContacts.concat(result.data.rows);
            refresher.complete();
          }
          else {
            this.supplierContacts = result.data.rows;
          }
        }
      });
    }
  }

  getProducts(refresher?) {

    // var url = "/Supplier?";
    // if (this.globals.userRule.toLowerCase() == "supplier") {
    //   url = "/Customer?";
    // }

    if (this.products.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.user_info, "Getproducts/" + this.supplier.id + "?order=asc&Limit=10&Offset=" + this.productsOffset).subscribe(result => {
        this.callDone = true;
        if (result.success) {
          if (refresher) {
            this.products = this.products.concat(result.data.rows);
            refresher.complete();
          }
          else {
            this.products = result.data.rows;
          }
        }
      });
    }
  }


  getAttachments(refresher?) {
    if (this.attachments.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.attachements, "?search&order=asc&ownerEntityId=" + this.supplier.id + "&Limit=10&Offset=" + this.arrachmentsOffset).subscribe(result => {
        this.callDone = true;
        if (result.success) {
          if (refresher) {
            this.attachments = this.attachments.concat(result.data.rows);
            refresher.complete();
          }
          else {
            this.attachments = result.data.rows;
          }
        }
      });
    }
  }

  download(file) {
    window.open("http://crm.kmkchemicals.com/uploads/" + file.name, "_system");
  }

  next(refresher) {
    if (this.selectedOption == "details") {
      refresher.complete();
    }
    else if (this.selectedOption == "contacts") {
      this.contactsOffset += 10;
      this.getContacts(refresher);
    }
    else if (this.selectedOption == "products") {
      this.productsOffset += 10;
      this.getProducts(refresher);
    }
    else if (this.selectedOption == "attachments") {
      this.arrachmentsOffset += 10;
      this.getAttachments(refresher);
    }
  }

  delete(id, index) {
    var obj = new alertFields();
    obj.title = "general.confirm-title";
    obj.message = "general.confirm-msg";
    obj.cancel = "general.cancel";
    obj.ok = "general.confirm";

    this.alert.displayConfirmAlert(obj).then(result => {
      this.httpCall.delete(this.globals.servicesURL.user_info, "products/" + id + "?status=3").subscribe(result => {
        this.products.splice(index, 1);
        this.alert.displayToast("products.delete-success")
      });
    });
  }

  viewReport(product) {
    this.navCtrl.push("SuppliersPage", { product: product });
  }

  getContactFileName(contact) {
    this.httpCall.get(this.globals.servicesURL.attachements, "?OwnerEntityId=" + contact.id + "&Limit=10").subscribe(result => {
      if (result.data != null && result.data.rows.length > 0) {
        this.downloadAttach(result.data.rows[0]);
      }
    });
  }

  downloadAttach(file) {
    window.open("http://crm.kmkchemicals.com/uploads/" + file.name, "_system");
  }

}
