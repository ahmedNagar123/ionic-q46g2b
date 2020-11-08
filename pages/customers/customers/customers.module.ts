import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersPage } from './customers';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    CustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CustomersPageModule { }
