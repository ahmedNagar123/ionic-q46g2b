import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../providers/providers";

/**
 * Generated class for the AddEditContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-contacts',
  templateUrl: 'add-edit-contacts.html',
})
export class AddEditContactsPage {

  mode: string = "add";
  contactId: string = "";
  contactName: string = "";
  contactMail: string = "";
  selectedTitle: any = {};
  titles: any = [{ key: 1, value: "contacts.mr" }, { key: 2, value: "contacts.ms" }, { key: 3, value: "contacts.dr" }, { key: 4, value: "contacts.eng" }];
  contactPhone: string = "";
  contactPosition: string = "";
  contactNote: string = "";
  isContact: boolean = false;
  file: any = {};
  attachName: string = "";
  contactDetails: any = {};
  custId: string = "";
  type: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private globals: GlobalProvider, private httpCall: HttpBaseProvider,
    private viewCtrl: ViewController, private alert: AlertProvider) {
    this.mode = this.navParams.data.mode;
    this.type = this.navParams.data.type;
    this.custId = this.navParams.data.custId;
    if (this.mode == "edit") {
      this.contactId = this.navParams.data.contactId;
      this.getcontactDetails();
    }
    setTimeout(() => {
      var input = document.getElementById("fileInput");
      input.addEventListener('change', ($event: any) => {
        this.file = $event.srcElement.files[0];
        if (this.file != undefined) {
          this.attachName = this.file.name;
        }
      });
    }, 100);
  }

  getcontactDetails() {
    var Obj = {};
    if (this.type == "customers") {
      Obj = this.globals.servicesURL.customers;
    }
    else {
      Obj = this.globals.servicesURL.suppliers;
    }

    this.httpCall.get(Obj, "/Contact/" + this.contactId).subscribe(result => {
      this.contactDetails = result.data;
      this.contactName = this.contactDetails.name;
      this.contactMail = this.contactDetails.email;
      this.contactPhone = this.contactDetails.mobile;
      this.contactPosition = this.contactDetails.position;
      this.contactNote = this.contactDetails.notes;
      this.isContact = this.contactDetails.isContactPerson;
      var temp = this.titles.filter(item => {
        if (item.key == this.contactDetails.title) {
          return item;
        }
      });
      if (temp.length > 0) {
        this.selectedTitle = temp[0];
      }
    });
  }

  saveContact() {

    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.selectedTitle.key);
    formData.append('email', this.contactMail);
    formData.append('name', this.contactName);
    formData.append('mobile', this.contactPhone);
    formData.append('position', this.contactPosition);
    formData.append('notes', this.contactNote);
    formData.append('isContactPerson', this.isContact.toString());

    var Obj = {};
    if (this.type == "customers") {
      formData.append('customerId', this.custId);
      Obj = this.globals.servicesURL.customers;
    }
    else {
      formData.append('supplierId', this.custId);
      Obj = this.globals.servicesURL.suppliers;
    }

    if (this.mode == "add") {
      this.httpCall.uploadContactAttachment(Obj, formData, "/contacts", "POST").then((result: any) => {
        if (result.success) {
          this.alert.displayToast("general.success");
          this.clearContact();
          this.viewCtrl.dismiss(true);
        }
      });
    }
    else {
      formData.append('id', this.contactId);
      this.httpCall.uploadContactAttachment(Obj, formData, "/contacts", "PUT").then((result: any) => {
        if (result.success) {
          this.alert.displayToast("general.success");
          this.clearContact();
          this.viewCtrl.dismiss(true);
        }
      });
    }
  }

  validateInputs() {
    if (this.contactName == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "suppliers.name");
      return false;
    }
    else if (this.contactMail == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "suppliers.email");
      return false;
    }
    else if (!this.globals.validateEmail(this.contactMail)) {
      this.alert.displayErrorToast("suppliers.email-error");
      return false;
    }
    else if (this.selectedTitle.key == undefined || this.selectedTitle.key == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "customers.cont-title");
      return false;
    }
    else if (this.contactPhone == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "customers.cont-phone");
      return false;
    }
    else if (this.contactPosition == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "customers.cont-position");
      return false;
    }

    return true;
  }

  clearContact() {
    this.contactName = this.contactMail = this.contactPhone = this.contactPosition =
      this.contactNote = this.attachName = "";
    this.isContact = false;
    this.file = this.selectedTitle = {};
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  saveAttach() {

    if (this.file.name != undefined) {
      var data = {
        file: this.file,
        title: this.contactName,
        id: this.contactId,
        notes: this.contactNote
      };

      this.httpCall.uploadAttachment(this.globals.servicesURL.upload, data).then(result => {
        this.alert.displayToast("general.file-success");
        this.clearContact();
      }, error => {
        this.clearContact();
      });
    }
    else {
      this.alert.displayErrorToast("general.file-error");
    }
  }

}
