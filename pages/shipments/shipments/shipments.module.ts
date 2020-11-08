import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipmentsPage } from './shipments';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    ShipmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipmentsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ShipmentsPageModule { }
