import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reg-form',
  templateUrl: 'reg-form.component.html',
  styleUrls: ['./reg-form.component.less']
})
export class RegFormComponent implements OnInit {

  @Input()
  parent: FormGroup;

  @Output()
  submit = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onsubmit(event){
    event.stopPropagation();
    this.submit.emit(this.parent);
  }

}
