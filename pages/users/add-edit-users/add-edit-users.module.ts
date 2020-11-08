import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditUsersPage } from './add-edit-users';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    AddEditUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditUsersPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class AddEditUsersPageModule { }
