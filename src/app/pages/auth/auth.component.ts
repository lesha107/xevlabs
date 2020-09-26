import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, filter, mergeMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { SignIn } from 'src/app/models/UserOptions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
<<<<<<< HEAD
export class AuthComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;
=======
export class AuthComponent {
  public readonly form: FormGroup;
  public readonly model?;
  public readonly options: FormlyFormOptions;
  public readonly fields: FormlyFieldConfig[];
>>>>>>> 441e249b5f34f0d1aa566474afb6cda23c7f94b2

  constructor(
    private _router: Router,
    private _authService: AuthService,
<<<<<<< HEAD
    private _userService: UserService,
    private _toastr: ToastrService
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
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        placeholder: 'Write password...',
        type: 'password',
        required: true,
        asdsadass: 'asdasdsad',
      },
    },
  ];
  ngOnInit(): void {
    this._toastr.overlayContainer = this.toastContainer;
  }
=======
    private _userService: UserService
  ) {
    this.form = new FormGroup({});
    this.options = {};
    this.fields = this.getFormlyFields();
  }

  getFormlyFields() {
    return [
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
  }

>>>>>>> 441e249b5f34f0d1aa566474afb6cda23c7f94b2
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.signInWithPassword(this.form.value).subscribe(() => {
      this._router.navigate(['admin']);
    });
  }

  signInWithPassword(data: SignIn) {
    return this._authService.signIn(data).pipe(
      untilDestroyed(this),
      tap((data) => {
        this._userService.currentUser$.next(data.user);
      }),
      catchError((er) => {
        this.showError(er.message);
        return throwError(er);
      })
    );
  }
  public showError(er): void {
    this._toastr.error(er);
  }
}
