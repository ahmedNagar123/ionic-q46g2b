import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SendComponent } from './send/send';

@NgModule({
	declarations: [HeaderComponent,
    ],
	imports: [IonicModule, TranslateModule.forChild()],
	exports: [HeaderComponent, TranslateModule,
    ]
})
export class ComponentsModule {}
