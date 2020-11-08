import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider, alertFields } from "../../../providers/providers";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddEditOpportunitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-opportunities',
  templateUrl: 'add-edit-opportunities.html',
})
export class AddEditOpportunitiesPage {

  selectedOption: any = "details";
  opportunityQuotations: any = [];
  file: any = {};
  attachName: string = "";
  attachmentsArr: any = [];
  title: string = "";
  opportunity: any = {};
  opportunityProducts: any = [];
  productsOffset: number = 0;
  quotationOffset: number = 0;
  attachmentsOffset: number = 0;
  calllDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private events: Events, private translateService: TranslateService) {
    this.opportunity = this.navParams.data.item;
    this.title = this.translateService.instant("opportunities.oppo-details");
  }

  getOrigin(id) {
    switch (id.toString()) {
      case "1":
        return "opportunities.email-received";
      case "2":
        return "opportunities.phone-received";
      case "3":
        return "opportunities.fax-received";
      case "4":
        return "opportunities.phone-made";
      case "5":
        return "opportunities.trender-list";
      case "6":
        return "opportunities.trender-invitation";
      case "7":
        return "opportunities.visit-made";
      case "8":
        return "opportunities.other";
    }
  }

  getDate(date) {
    var _date = new Date(date);
    return _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
  }

  segmentChanged(evt) {
    this.calllDone = false;
    if (this.selectedOption == "details") {
      this.title = this.translateService.instant("opportunities.oppo-details");
    }
    else if (this.selectedOption == "products") {
      this.title = this.translateService.instant("products.title");
      if (this.opportunityProducts.length < 1) {
        this.getOpportunityProducts();
      }
    }
    else if (this.selectedOption == "qoutation") {
      this.title = this.translateService.instant("quotations.title");
      if (this.opportunityQuotations.length < 1) {
        this.getOpportunityQoutations();
      }
    }
    else if (this.selectedOption == "attachments") {
      this.title = this.translateService.instant("products.attach");
      if (this.attachmentsArr.length < 1) {
        this.getAttachements();
      }
    }
  }

  getOpportunityProducts(refresher?) {
    this.httpCall.get(this.globals.servicesURL.opportunities, "/" + this.opportunity.id + "/products?order=asc&offset=" + this.productsOffset + "&limit=10").subscribe(result => {
      this.calllDone = true;
      if (refresher) {
        this.opportunityProducts = this.opportunityProducts.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.opportunityProducts = result.data.rows;
      }
    });
  }

  getOpportunityQoutations(refresher?) {
    this.httpCall.get(this.globals.servicesURL.opportunities, "/" + this.opportunity.id + "/quotations?order=asc&offset=" + this.quotationOffset + "&limit=10").subscribe(result => {
      this.calllDone = true;
      if (refresher) {
        this.opportunityQuotations = this.opportunityQuotations.concat(result.data.rows);
        refresher.complete();
      }
      else {
        this.opportunityQuotations = result.data.rows;
      }
    });
  }

  getAttachements(refresher?) {
    this.httpCall.get(this.globals.servicesURL.attachements, "?search=&order=asc&offset=" + this.attachmentsOffset + "&limit=10&OwnerEntityId=" + this.opportunity.id).subscribe(result => {
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
    else if (this.selectedOption == "products") {
      this.productsOffset += 10;
      this.getOpportunityProducts(refresher);
    }
    else if (this.selectedOption == "qoutation") {
      this.quotationOffset += 10;
      this.getOpportunityQoutations(refresher);
    }
    else if (this.selectedOption == "attachments") {
      this.attachmentsOffset += 10;
      this.getAttachements();
    }
  }

  viewQuotation(quot, index) {
    this.navCtrl.push("AddEditQuotationsPage", { mode: "edit", item: quot });
  }

  viewQuotationReport(item) {
    window.open("http://kmkchemicals.com/Quotation/Quotation-Report/" + item.id, "_system");
  }

  download(file) {
    window.open("http://crm.kmkchemicals.com/uploads/" + file.name, "_system");
  }
}

