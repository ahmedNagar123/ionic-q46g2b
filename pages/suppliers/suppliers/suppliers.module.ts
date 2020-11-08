import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuppliersPage } from './suppliers';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    SuppliersPage,
  ],
  imports: [
    IonicPageModule.forChild(SuppliersPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class SuppliersPageModule { }
