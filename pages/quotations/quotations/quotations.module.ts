import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotationsPage } from './quotations';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    QuotationsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotationsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class QuotationsPageModule { }
