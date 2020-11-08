import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditProductsPage } from './add-edit-products';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    AddEditProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditProductsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class AddEditProductsPageModule { }
