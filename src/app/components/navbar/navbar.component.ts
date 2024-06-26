import { Component, OnInit } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;

    translate.addLangs(['en', 'mar', 'hin']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
}

  ngOnInit(): void {
  }

}
