import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddEditCustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-customers',
  templateUrl: 'add-edit-customers.html',
})
export class AddEditCustomersPage {

  mode: string = "";
  name: string = "";
  phone: string = "";
  fax: string = "";
  description: string = "";
  email: string = "";
  address1: string = "";
  address2: string = "";
  website: string = "";
  countries: any = [];
  customer: any = {};
  products: any = [];
  selectedProducts: any;
  selectedCountry: any = {
    id: "",
    name: ""
  };
  title: string = "";
  selectedOption: any = "details";
  customerProducts: any = [];
  customerContacts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events,
    private translateService: TranslateService, private modal: ModalController) {
    this.mode = this.navParams.data.mode;
    if (this.mode == "edit") {
      this.customer = this.navParams.data.item;
      this.getCustomerDetails();
      this.getProducts();
    }
  }

  ionViewDidLoad() {
    if (this.mode == "add") {
      this.getCountries();
    }
  }

  getCountries() {
    this.httpCall.get(this.globals.servicesURL.countries).subscribe(result => {
      if (result.success) {
        this.countries = result.data;
        if (this.mode == "edit") {
          var temp = this.countries.filter(item => {
            if (item.id == this.selectedCountry.id) {
              return item;
            }
          });
          if (temp.length > 0) {
            this.selectedCountry = temp[0];
          }
        }
      }
    });
  }
 
  getProducts() {
    if (this.products.length < 1) {
      this.httpCall.get(this.globals.servicesURL.products, "?limit=1000000").subscribe(result => {
        this.products = result.data.rows;
      });
    }
  }

  getCustomerDetails() {
    this.httpCall.get(this.globals.servicesURL.customers, "/" + this.customer.id).subscribe(result => {
      if (result.success) {
        this.name = result.data.name;
        this.phone = result.data.phone;
        this.fax = result.data.fax;
        this.description = result.data.description;
        this.email = result.data.email;
        this.address1 = result.data.addressLine1;
        this.address2 = result.data.addressLine2;
        this.website = result.data.website;
        this.selectedCountry.id = result.data.countryId;
        this.getCountries();
        this.title = this.translateService.instant("general.edit") + " " + this.name;
      }
    });
  }

  save() {
    if (this.validateInputs()) {
      var data: any = {};
      data.name = this.name;
      data.phone = this.phone;
      data.fax = this.fax;
      data.description = this.description;
      data.email = this.email;
      data.addressLine1 = this.address1;
      data.addressLine2 = this.address2;
      data.website = this.website;
      if (this.selectedCountry.id) {
        data.countryId = this.selectedCountry.id;
        data.country = this.selectedCountry.name;
      }
      if (this.mode == "add") {
        this.httpCall.post(this.globals.servicesURL.customers, data).subscribe(result => {
          this.handleSuccess(result);
        });
      }
      else {
        data.id = this.customer.id;
        // data.productsNotAssigned = this.selectedProducts;
        this.httpCall.put(this.globals.servicesURL.customers, data).subscribe(result => {
          this.handleSuccess(result);
        });
      }
    }
  }

  handleSuccess(result) {
    if (result.success) {
      this.alert.displayToast("general.success");
      this.events.publish("reload:customers");
      this.navCtrl.pop();
    }
  }

  clear() {
    this.name = this.phone = this.fax = this.description = this.email = this.address1 = this.address2 =
      this.website = this.selectedCountry.id = this.selectedCountry.name = "";
  }

  validateInputs() {
    if (this.name == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "suppliers.name");
      return false;
    }
    else if (this.email == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "suppliers.email");
      return false;
    }
    else if (!this.globals.validateEmail(this.email)) {
      this.alert.displayErrorToast("suppliers.email-error");
      return false;
    }
    else if (this.phone == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "suppliers.phone");
      return false;
    }
    else if (this.selectedCountry.id == undefined || this.selectedCountry.id == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "suppliers.country");
      return false;
    }
    else if (this.address1 == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "suppliers.address1");
      return false;
    }
    return true;
  }

  deleteProduct(index) {
    this.httpCall.delete(this.globals.servicesURL.customers, "/products/" + this.customerProducts[index].id).subscribe(result => {
      this.customerProducts.splice(index, 1);
      this.alert.displayToast("general.success");
    });
  }

  segmentChanged(evt) {
    if (this.selectedOption == "products") {
      if (this.customerProducts.length < 1) {
        this.httpCall.get(this.globals.servicesURL.customers, "/" + this.customer.id + "/products?limit=1000000").subscribe(result => {
          this.customerProducts = result.data.rows;
        });
      }
    }
    else if (this.selectedOption == "contacts") {
      if (this.customerContacts.length < 1) {
        this.getCustomerContacts();
      }
    }
  }

  getCustomerContacts() {
    this.httpCall.get(this.globals.servicesURL.customers, "/" + this.customer.id + "/contacts?limit=1000000").subscribe(result => {
      this.customerContacts = result.data.rows;
    });
  }

  saveProd() {
    var data = {
      "customerId": this.customer.id,
      "productId": this.selectedProducts.id,
      "productName": this.selectedProducts.name,
      "casNumber": this.selectedProducts.casNumber,
      "hsCode": this.selectedProducts.hsCode
    }
    this.httpCall.post(this.globals.servicesURL.customers, data, "/products").subscribe(result => {
      if (result.success) {
        this.alert.displayToast("general.success");
        // this.customerProducts.push(data);
        this.httpCall.get(this.globals.servicesURL.customers, "/" + this.customer.id + "/products?limit=1000000").subscribe(result => {
          this.customerProducts = result.data.rows;
        });
        this.clearProd();
      }
    });
  }

  clearProd() {
    this.selectedProducts = {};
  }

  editContact(contact) {
    var modal = this.modal.create("AddEditContactsPage", { mode: "edit", contactId: contact.id, custId: this.customer.id, type: "customers" });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.getCustomerContacts();
      }
    });
  }

  deleteContact(index) {
    this.httpCall.delete(this.globals.servicesURL.customers, "/contacts/" + this.customerContacts[index].id).subscribe(result => {
      this.customerContacts.splice(index, 1);
      this.alert.displayToast("general.success");
    });
  }

  createContact(contact) {
    var modal = this.modal.create("AddEditContactsPage", { mode: "add", custId: this.customer.id, type: "customers" });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.getCustomerContacts();
      }
    });
  }
}
