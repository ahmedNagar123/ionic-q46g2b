import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddEditProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-products',
  templateUrl: 'add-edit-products.html',
})
export class AddEditProductsPage {

  mode: string = "";
  name: string = "";
  cas: string = "";
  hs: string = "";
  description: string = "";
  product: any = {};
  title: string = "";
  selectedOption: any = "details";
  attachTitle: string = "";
  attachName: string = "";
  attachmentsArr: any = [];
  file: any = {};
  notes: string = "";
  fileEvent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.mode = this.navParams.data.mode;
    if (this.mode == "edit") {
      this.product = this.navParams.data.item;
      this.getProductDetails();
    }
  }

  getProductDetails() {
    this.httpCall.get(this.globals.servicesURL.products, "/" + this.product.id).subscribe(result => {
      if (result.success) {
        this.name = result.data.name;
        this.cas = result.data.casNumber;
        this.hs = result.data.hsCode;
        this.description = result.data.description;
        this.title = this.translateService.instant("general.edit") + " " + this.name;
      }
    });
  }

  save() {
    if (this.validateInputs()) {
      var data: any = {};
      data.name = this.name;
      data.casNumber = this.cas;
      data.hsCode = this.hs;
      data.description = this.description;
      if (this.mode == "add") {
        this.httpCall.post(this.globals.servicesURL.products, data).subscribe(result => {
          this.handleSuccess(result);
        });
      }
      else {
        data.id = this.product.id;
        this.httpCall.put(this.globals.servicesURL.products, data).subscribe(result => {
          this.handleSuccess(result);
        });
      }
    }
  }

  handleSuccess(result) {
    if (result.success) {
      this.alert.displayToast("general.success");
      this.events.publish("reload:products");
      this.navCtrl.pop();
    }
  }

  clear() {
    this.name = this.cas = this.hs = this.description = "";
  }

  validateInputs() {
    if (this.name == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "products.prod-name");
      return false;
    }
    else if (this.cas == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "products.cas");
      return false;
    }
    else if (this.hs == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "products.hs");
      return false;
    }

    return true;
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
        id: this.product.id,
        notes: this.notes
      };

      this.httpCall.uploadAttachment(this.globals.servicesURL.upload, data).then(result => {
        this.alert.displayToast("general.file-success");
        this.attachmentsArr.push({
          name: this.file.name,
          title: this.attachTitle,
          notes: this.notes
        });
        this.file = {};
        this.attachTitle = this.attachName = this.notes = "";
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
    this.httpCall.get(this.globals.servicesURL.attachements, "?Limit=1000000&OwnerEntityId=" + this.product.id).subscribe(result => {
      this.attachmentsArr = result.data.rows;
    });
  }
}
