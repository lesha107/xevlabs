import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldSelect } from '@ngx-formly/material/select';
import { UserOptions } from '../../models/UserOptions';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserOptions
  ) {}
  ngOnInit(): void {
    // this.form = this._formBuilder.group({
    //   firstName: '',
    //   number: '',
    //   email: '',
    //   password: '',
    //   birthday: '',
    //   role: '',
    // });

    this.form = new FormGroup({});
    this.model = {};
    this.options = {
      formState: {
        awesomeIsForced: false,
      },
    };
    this.fields = [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true,
        },
      },
      {
        key: 'phoneNumber',
        type: 'input',
        templateOptions: {
          label: 'Phone Number',
          placeholder: 'Enter your number',
          required: true,
        },
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Enter your email',
          type: 'email',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Password',
          placeholder: 'Enter your password',
          type: 'password',
          required: true,
        },
      },
      {
        key: 'birthday',
        type: 'datepicker',
        templateOptions: {
          label: 'Birthday date',
          placeholder: 'Choose your birthday',
          required: true,
        },
      },
      {
        key: 'role',
        type: 'select',
        templateOptions: {
          label: 'Role',
          options: [
            { value: 'admin', label: 'admin' },
            { value: 'user', label: 'user' },
          ],
          placeholder: 'Enter your number',
          required: true,
        },
      },
    ];
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
