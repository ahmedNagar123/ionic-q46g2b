import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";

/**
 * Generated class for the SuppliersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suppliers',
  templateUrl: 'suppliers.html',
})
export class SuppliersPage {

  suppliers: any = [];
  search: string = "";
  callDone: boolean = false;
  product: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private events: Events) {
    this.product = this.navParams.data.product;
  }

  ionViewDidLoad() {
    this.getSuppliers();
  }

  getSuppliers(refresher?) {
    var url = "ProductSuppliersReport?";
    if (this.globals.userRule.toLowerCase() == "supplier") {
      url = "ProductCustomersReport?";
    }

    this.httpCall.get(this.globals.servicesURL.user_info, url + "productId=" + this.product.productId).subscribe(result => {
      this.callDone = true;
      this.suppliers = result.data;
    });
  }

  delete(id, index) {
    this.httpCall.delete(this.globals.servicesURL.products, "/" + id).subscribe(result => {
      this.suppliers.splice(index, 1);
    });
  }

  view(supplier) {
    this.navCtrl.push("AddEditSuppliersPage", { item: supplier });
  }

  add() {
    this.navCtrl.push("AddEditSuppliersPage", { mode: "add" });
  }
}
