import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditSamplesPage } from './add-edit-samples';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddEditSamplesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditSamplesPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AddEditSamplesPageModule { }
