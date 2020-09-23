import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOptions } from '../../models/UserOptions';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserOptions
  ) {}
  ngOnInit() {
    this.form = this._formBuilder.group({
      firstName: '',
      number: '',
      email: '',
      password: '',
      birthday: '',
      role: '',
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
