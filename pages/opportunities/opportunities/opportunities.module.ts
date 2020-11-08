import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunitiesPage } from './opportunities';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    OpportunitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(OpportunitiesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class OpportunitiesPageModule { }
