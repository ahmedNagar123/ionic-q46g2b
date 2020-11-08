import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddEditUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-users',
  templateUrl: 'add-edit-users.html',
})
export class AddEditUsersPage {

  title: string = "";
  mode: string = "";
  user: any = {};
  fullname: string = "";
  signature: string = "";
  email: string = "";
  selectedRole: any = {
    id: "",
    name: ""
  };
  roles: any = [];
  locked: boolean = false;
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.mode = this.navParams.data.mode;
    if (this.mode == "edit") {
      this.user = this.navParams.data.item;
      this.getUserDetails();
    }
  }

  ionViewDidLoad() {
    this.getRoles();
  }

  getRoles() {
    this.httpCall.get(this.globals.servicesURL.roles).subscribe(result => {
      if (result.success) {
        this.roles = result.data;
        if (this.mode == "edit") {
          var temp = this.roles.filter(item => {
            if (item.id == this.selectedRole.id) {
              return item;
            }
          });
          if (temp.length > 0) {
            this.selectedRole = temp[0];
          }
        }
      }
    });
  }

  getUserDetails() {
    this.httpCall.get(this.globals.servicesURL.users, "/" + this.user.id).subscribe(result => {
      if (result.success) {
        this.fullname = result.data.fullname;
        this.signature = result.data.signature;
        this.email = result.data.email;
        try {
          if (result.data.userRoles.length > 0) {
            this.selectedRole.id = result.data.userRoles[0].roleId;
          }
        }
        catch (e)
        { }
        this.title = this.translateService.instant("general.edit") + " " + this.fullname;
      }
    });
  }

  clear() {
    this.fullname = this.signature = this.email = this.password = "";
    this.locked = false;
    this.selectedRole = {};
  }

  save() {
    if (this.validateInputs()) {
      var data: any = {};
      data.Email = this.email;
      data.Fullname = this.fullname;
      data.Signature = this.signature;
      data.Role = this.selectedRole.id;
      // data.Password = this.password;

      if (this.mode == "add") {
        this.httpCall.post(this.globals.servicesURL.users, data, "/Create").subscribe(result => {
          this.handleSuccess(result);
        });
      }
      else {
        data.id = this.user.id;
        this.httpCall.put(this.globals.servicesURL.users, data, "/Update").subscribe(result => {
          this.handleSuccess(result);
        });
      }
    }
  }

  handleSuccess(result) {
    if (result.success) {
      this.alert.displayToast("general.success");
      this.events.publish("reload:users");
      this.navCtrl.pop();
    }
  }

  validateInputs() {
    if (this.fullname == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "users.full-name");
      return false;
    }
    else if (this.selectedRole.name == undefined || this.selectedRole.name == "") {
      this.alert.displayErrorToast2("general.please", "general.choose", "users.role");
      return false;
    }
    else if (this.email == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "users.email");
      return false;
    }
    // else if (this.password == "") {
    //   this.alert.displayErrorToast2("general.please", "general.enter", "users.password");
    //   return false;
    // }
    else if (!this.globals.validateEmail(this.email)) {
      this.alert.displayErrorToast("suppliers.email-error");
      return false;
    }
    else if (this.signature == "") {
      this.alert.displayErrorToast2("general.please", "general.enter", "users.signature");
      return false;
    }
    return true;
  }
}
