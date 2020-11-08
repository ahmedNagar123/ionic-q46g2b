import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpBaseProvider, InterceptorProvider, AlertProvider, GlobalProvider, TranslateProvider, MyErrorHandler } from '../providers/providers';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicSelectableModule } from 'ionic-selectable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { SendComponent } from '../components/send/send';
import { InAppBrowser } from '@ionic-native/in-app-browser';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    SendComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: "ios"
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    IonicSelectableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SendComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: MyErrorHandler },
    HttpBaseProvider,
    InterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    },
    AlertProvider,
    GlobalProvider,
    TranslateProvider,
    AuthHttp,
    InAppBrowser
  ]
})
export class AppModule { }
