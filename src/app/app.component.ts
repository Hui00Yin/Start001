import { Component } from '@angular/core';
import { IContent } from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app works!';
  selected:string;

  selectItem(message: string){
    this.selected = message;
  }
}
