import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditOrdersPage } from './add-edit-orders';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    AddEditOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditOrdersPage),
    TranslateModule.forChild(),
    ComponentsModule,
  ],
})
export class AddEditOrdersPageModule { }
