import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditQuotationsPage } from './add-edit-quotations';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddEditQuotationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditQuotationsPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AddEditQuotationsPageModule { }
