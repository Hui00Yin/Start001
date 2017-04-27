import { Component, OnInit, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'
import {MdIconRegistry} from '@angular/material';
import { IContent, ContentService } from '../services/content.service';

@Component({
  selector: 'app-content-tab',
  inputs:['selected'],
  outputs:['onSelect'],
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.less']
})
export class ContentTabComponent implements OnInit {
  private lists:IContent[] = [];

  selected: string;
  onSelect: EventEmitter<string>;
  constructor(private content: ContentService,
              mdIconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) 
  {
    // Register the user `avatar` icons
    mdIconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/avatars.svg"))
      .addSvgIcon("menu", sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/menu.svg"))
      .addSvgIcon("share", sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/share.svg"))
      .addSvgIcon("google_plus", sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/google_plus.svg"))
      .addSvgIcon("hangouts", sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/hangouts.svg"))
      .addSvgIcon("twitter", sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/twitter.svg"))
      .addSvgIcon("phone", sanitizer.bypassSecurityTrustResourceUrl("./assets/svg/phone.svg"));
    this.onSelect = new EventEmitter();
               
  }

  ngOnInit() {
    this.content.loadAllContent()
    .then((lists) => {
        this.lists = lists;
    });
  }

  selectUser(list){
    this.onSelect.emit(list.name);
  }
}
