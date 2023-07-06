import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group-errors',
  templateUrl: './form-group-errors.component.html',
  styleUrls: ['./form-group-errors.component.scss']
})
export class FormGroupErrorsComponent {

  @Input() formGroup!: FormGroup;

}
