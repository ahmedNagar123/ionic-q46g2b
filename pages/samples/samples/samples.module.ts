import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SamplesPage } from './samples';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    SamplesPage,
  ],
  imports: [
    IonicPageModule.forChild(SamplesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class SamplesPageModule { }
