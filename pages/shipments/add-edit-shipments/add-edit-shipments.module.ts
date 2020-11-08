import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditShipmentsPage } from './add-edit-shipments';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddEditShipmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditShipmentsPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AddEditShipmentsPageModule { }
