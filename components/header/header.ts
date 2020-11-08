import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html' 
})
export class HeaderComponent {

  @Output() searchBarOnInputChange: any = new EventEmitter<any>();
  @Output() nextButtonEmitter = new EventEmitter<any>();
  @Input() showBackButton: boolean = false;
  @Input() showSearchBar: boolean = false;
  @Input() hideHomeBtn: boolean = false;
  @Input() hideNavBar: boolean = false;
  @Input() hideToolBar: boolean = false;
  @Input() showNavLogo: boolean = false;
  @Input() showToolLogo: boolean = false;
  @Input() toolBarTitle: string = "";
  @Input() navBarTitle: string = "";
  @Input() nextButtonTxt: string = "";
  searchValue: string = "";

  constructor(private menu: MenuController, private navCtrl: NavController) {
  }

  toggleMenu() {
    this.menu.toggle();
  }

  back() {
    this.navCtrl.pop();
  }

  onInput() {
    this.searchBarOnInputChange.emit(this.searchValue);
  }

  next() {
    this.nextButtonEmitter.emit();
  }

  home() {
    this.navCtrl.setRoot("ProductsPage");
  }
}
