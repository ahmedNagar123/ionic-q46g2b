import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  // public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn: boolean = false;
  public accessToken: string = "";
  public activeTab: string = "workspace";
  public userInfo: any = {};
  public allProducts: any = [];
  public userRule: string = "";

  public servicesURL: any = {
    login: {
      url: "user/login"
    },
    products:
    {
      url: "product-management"
    },
    customers: {
      url: "customer-management"
    },
    suppliers: {
      url: "supplier-management"
    },
    countries: {
      url: "Country"
    },
    opportunities: {
      url: "Opportunity-Details"
    },
    users: {
      url: "user"
    },
    roles: {
      url: "Role-management/list-all"
    },
    samples: {
      url: "Sample"
    },
    quotations: {
      url: "Quotation"
    },
    shipments: {
      url: "Shipment"
    },
    orders: {
      url: "Order"
    },
    upload:
    {
      url: "attachment-management/upload"
    },
    attachements:
    {
      url: "attachment-management"
    },
    user_info: {
      url: "user-management/"
    },
    all_products: {
      url: "User-management-NotAssignedproduct"
    },
    quot_orders: {
      url: "QuotationOrder"
    },
    provider: {
      url: "Provider-Info"
    }
  }
  constructor()
  { }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true);
    }
    return (false);
  }
}
