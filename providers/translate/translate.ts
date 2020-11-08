import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class TranslateProvider {

  constructor(public translate: TranslateService, private storage: Storage) {
  }

  changeLang() {
    var htmlElm = document.getElementsByTagName("html")[0];
    this.storage.get('lang').then(result => {
      if (result == "" || result == "ar") {
        this.translate.use("en").subscribe(result => {
          this.storage.set("lang", "en");
          htmlElm.classList.remove("arabic");
          htmlElm.setAttribute("lang", "en");
          htmlElm.setAttribute("dir", "ltr");
        });
      }
      else {
        this.translate.use("ar").subscribe(result => {
          this.storage.set("lang", "ar");
          htmlElm.classList.add("arabic");
          htmlElm.setAttribute("lang", "ar");
          htmlElm.setAttribute("dir", "rtl");
        });
      }
    });
  }

  useLang() {
    var htmlElm = document.getElementsByTagName("html")[0];
    this.storage.get('lang').then(result => {
      if (result == "ar") {
        this.translate.use("ar").subscribe(result => {
          htmlElm.classList.add("arabic");
          htmlElm.setAttribute("lang", "ar");
          htmlElm.setAttribute("dir", "rtl");
        });
      }
      else {
        this.translate.use("en").subscribe(result => {
          htmlElm.classList.remove("arabic");
          htmlElm.setAttribute("lang", "en");
          htmlElm.setAttribute("dir", "ltr");
        });
      }
    });
  }

  getCurrentLang()
  {
    return this.translate.currentLang;
  }
}
