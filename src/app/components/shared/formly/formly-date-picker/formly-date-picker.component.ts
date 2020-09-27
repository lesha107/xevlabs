import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FieldType } from '@ngx-formly/core';

@UntilDestroy()
@Component({
  selector: 'app-formly-date-picker',
  templateUrl: './formly-date-picker.component.html',
  styleUrls: ['./formly-date-picker.component.scss'],
})
export class FormlyDatePickerComponent extends FieldType implements OnInit {
  formGroup: FormGroup;

  constructor() {
    super();

    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {
    this.subscribeOnValueChanges();
  }

  private getFormGroup(): FormGroup {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    return new FormGroup({
      start: new FormControl(new Date(year, month, 1)),
      end: new FormControl(new Date(year, month, 28)),
    });
  }

  public subscribeOnValueChanges(): void {
    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((val) => {
      this.formControl.patchValue(val);
    });
  }
}
