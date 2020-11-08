import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AlertProvider, GlobalProvider } from "../providers/providers";
import { TranslateService } from '@ngx-translate/core';

declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  lastSelectedPage: string = "";

  pages: Array<{ title: string, component: any, icon: string, customerPage: boolean }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private event: Events,
    private alert: AlertProvider, private globals: GlobalProvider, private translate: TranslateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'products.title', component: "ProductsPage", icon: "flask", customerPage: false },
      { title: 'opportunities.title', component: "OpportunitiesPage", icon: "thumbs-up", customerPage: true },
      // { title: 'customers.title', component: "CustomersPage", icon: "people" },
      // { title: 'suppliers.title', component: "SuppliersPage", icon: "person-add" },
      { title: 'samples.title', component: "SamplesPage", icon: "water", customerPage: true },
      // { title: 'quotations.title', component: "QuotationsPage", icon: "create" },
      // { title: 'orders.title', component: "OrdersPage", icon: "cart" },
      // { title: 'shipments.title', component: "ShipmentsPage", icon: "boat" },
      // { title: 'users.title', component: "UsersPage", icon: "contacts" }
      { title: 'messages.inbox', component: "InboxPage", icon: "contacts", customerPage: false },
      { title: 'messages.send', component: "SendMessagePage", icon: "contacts", customerPage: false }
    ];
  }

  checkShowHidePage(page) {
    if (page.customerPage) {
      return (this.globals.userRule == 'Customer');
    }
    return true;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.translate.setDefaultLang("en");
      this.translate.use("en");


      // this.includeScript("http://www.formilla.com/scripts/feedback.js", function () {
      //   alert("24")
      //   //here the injection is completed, you can go next
      //   Formilla.guid = 'cs99ec9b-b412-4d9f-a751-4f14ba690509';
      //   Formilla.loadWidgets();
      // });
      window.open = window.cordova.InAppBrowser.open;

    });
  }

  openPage(pageName, saveHistory) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // if (this.lastSelectedPage != page.component) {
    if (saveHistory) {
      this.lastSelectedPage = pageName;
    }
    this.nav.setRoot(pageName);
    // }
  }

  logout() {
    this.globals.isUserLoggedIn = false;
    this.nav.setRoot("LoginPage");
  }


  includeScript(path, cb) {
    var node = document.createElement("script"),
      okHandler,
      errHandler;
    node.src = path;

    okHandler = function () {
      this.removeEventListener("load", okHandler);
      this.removeEventListener("error", errHandler);
      cb();
    };
    errHandler = function (error) {
      this.removeEventListener("load", okHandler);
      this.removeEventListener("error", errHandler);
      cb("Error loading script: " + path);
    };
    node.addEventListener("load", okHandler);
    node.addEventListener("error", errHandler);
    document.body.appendChild(node);
  }
}
