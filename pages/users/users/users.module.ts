import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersPage } from './users';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class UsersPageModule { }
