import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditContactsPage } from './add-edit-contacts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddEditContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditContactsPage),
    TranslateModule.forChild()
  ],
})
export class AddEditContactsPageModule { }
