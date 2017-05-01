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


  @Input()
  total: string;

  @Input()
  prices: any;

  @Output()
  add = new EventEmitter<any>();

  @Output()
  remove = new EventEmitter<any>();

  @Output()
  toggle = new EventEmitter<number>();

  onAddPizza(event) {
    this.add.emit(event);
  }

  onRemovePizza(event) {
    this.remove.emit(event);
  }

  onToggle(event) {
    this.toggle.emit(event);
  }

  onSubmit(event) {
    event.stopPropagation();
    this.submit.emit(this.parent);
  }
}
