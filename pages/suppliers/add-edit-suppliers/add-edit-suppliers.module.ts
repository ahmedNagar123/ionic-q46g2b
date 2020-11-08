import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditSuppliersPage } from './add-edit-suppliers';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddEditSuppliersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditSuppliersPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AddEditSuppliersPageModule { }
