import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPage } from './forget-password';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),
    TranslateModule.forChild(),
    ComponentsModule,
  ],
})
export class ForgetPasswordPageModule { }
