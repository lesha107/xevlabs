import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-select',
  templateUrl: './formly-select.component.html',
  styleUrls: ['./formly-select.component.scss'],
})
export class FormlySelectComponent extends FieldType {}
