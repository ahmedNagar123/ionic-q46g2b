import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class ProductsPageModule { }
