import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxPage } from './inbox';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    InboxPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class InboxPageModule { }
