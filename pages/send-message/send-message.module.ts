import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMessagePage } from './send-message';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    SendMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(SendMessagePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class SendMessagePageModule { }
