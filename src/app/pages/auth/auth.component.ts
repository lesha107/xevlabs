import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, filter, mergeMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Write email...',
        description: 'Description',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        placeholder: 'Write password...',
        description: 'Description',
        required: true,
      },
    },
  ];

  onSubmit() {
    console.log('asd', this.form.value);
    if (this.form.valid) {
      this.signInWithPassword(this.form.value).subscribe(() => {
        this._router.navigate(['admin']);
      });
    } else {
      console.log('wrong data');
    }
  }

  signInWithPassword(data: { email: string; password?: string }) {
    return this._authService.signIn(data).pipe(
      tap((data) => {
        this._userService.currentUser$.next(data.user);
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
