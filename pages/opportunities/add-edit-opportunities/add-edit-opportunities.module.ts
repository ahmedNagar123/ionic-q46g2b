import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditOpportunitiesPage } from './add-edit-opportunities';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddEditOpportunitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditOpportunitiesPage),
    TranslateModule.forChild(),
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AddEditOpportunitiesPageModule { }
