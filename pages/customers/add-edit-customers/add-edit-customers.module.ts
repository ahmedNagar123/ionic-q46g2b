import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditCustomersPage } from './add-edit-customers';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddEditCustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditCustomersPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AddEditCustomersPageModule { }
 