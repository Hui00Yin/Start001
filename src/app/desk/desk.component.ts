import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DisplayResourceService } from '../services/display-resource.service';

@Component({
  selector: 'app-desk',
  inputs:['selected'],
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.less']
})
export class DeskComponent implements OnInit {

  constructor(private displayService: DisplayResourceService) { }

  path: string;
  selected: string;
  ngOnInit() {
    this.path = '/assets/imgs/cat.jpg';
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['selected'].previousValue !== changes['selected'].currentValue){
      this.updateImgSrc();
    }
  }

  private updateImgSrc(){
    this.displayService.loadImgByName(this.selected)
    .then((src:string) => {
      this.path = src;
    })
  }

}
