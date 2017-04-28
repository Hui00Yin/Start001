import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-container',
  template: `
    <div>
      <app-reg-form [parent]="form">
      </app-reg-form>
    </div>
  `,
  styleUrls: ['./form-container.component.less']
})
export class FormContainerComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      details: this.fb.group({
        name:['',Validators.required],
        email:['', Validators.required],
        confirm:['', Validators.required]
      })
    }, {})
  }

  ngOnInit() {
  }



}
