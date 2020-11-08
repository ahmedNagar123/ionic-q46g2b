import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider, alertFields } from "../../../providers/providers";

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: any = [];
  contactsOffset: number = 0;
  search: string = "";
  callDone: boolean = false;
  selectedOption: any = "userDetails";
  contacts: any = [];
  title: string = "users.details";
  attachments: any = [];
  productsOffset: number = 0;
  arrachmentsOffset: number = 0;
  allProducts: any = [];
  selectedProducts: any = {};
  userData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events, private alert: AlertProvider) {
  }

  ionViewDidLoad() {
    // this.getAllProducts();
    // this.getProducts();
      this.userData = this.globals.userInfo;
  }

  segmentChanged(evt) {
    if (this.selectedOption == "userDetails") {
      this.title = "users.details";
      this.userData = this.globals.userInfo;
    }
    else if (this.selectedOption == "contacts") {
      this.title = "contacts.list";
      this.getContacts();
    }
    else if (this.selectedOption == "products") {
      this.title = "products.list";
      this.getAllProducts();
      this.getProducts();
    }
    else if (this.selectedOption == "attachments") {
      this.title = "products.attach-list";
      this.getAttachments();
    }
  }

  getAttachments(refresher?) {
    if (this.attachments.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.attachements, "?search&order=asc&ownerEntityId=" + this.globals.userInfo.id + "&Limit=10&Offset=" + this.arrachmentsOffset).subscribe(result => {
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

  getContacts(refresher?) {
    if (this.contacts.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.user_info, "contacts?order=asc&Limit=10&Offset=" + this.contactsOffset).subscribe(result => {
        this.callDone = true;
        if (result.success) {
          if (refresher) {
            this.contacts = this.contacts.concat(result.data.rows);
            refresher.complete();
          }
          else {
            this.contacts = result.data.rows;
          }
        }
      });
    }
  }

  getAllProducts() {
    if (this.globals.allProducts.length < 1) {
      this.httpCall.get(this.globals.servicesURL.all_products, "?Limit=100000&Offset=0").subscribe(result => {
        var temp = result.data.sort((a, b) => {
          return a.name < b.name ? -1 : 1
        });
        this.allProducts = this.globals.allProducts = temp;
      });
    }
  }

  getProducts(refresher?) {
    if (this.products.length < 1 || refresher) {
      this.httpCall.get(this.globals.servicesURL.user_info, "Getproducts/?order=asc&Limit=10&Offset=" + this.productsOffset).subscribe(result => {
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

  next(refresher) {
    if (this.selectedOption == "contacts") {
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

  downloadAttach(file) {
    window.open("http://crm.kmkchemicals.com/uploads/" + file.name, "_system");
  }

  assignProduct() {
    this.httpCall.post(this.globals.servicesURL.user_info, { "customerId": this.globals.userInfo.id, "productId": this.selectedProducts.id }, "products").subscribe(result => {
      if (result.success) {
        this.selectedProducts = {};
        this.alert.displayToast("products.add-success");
        this.productsOffset = 0;
        this.httpCall.get(this.globals.servicesURL.user_info, "Getproducts/?order=asc&Limit=10&Offset=" + this.productsOffset).subscribe(result => {
          this.callDone = true;
          if (result.success) {
            this.products = result.data.rows;
          }
        });
      }
    });
  }

  getContactFileName(contact) {
    this.httpCall.get(this.globals.servicesURL.attachements, "?OwnerEntityId=" + contact.id + "&Limit=10").subscribe(result => {
      if (result.data != null && result.data.rows.length > 0) {
        this.downloadAttach(result.data.rows[0]);
      }
    });
  }
}
