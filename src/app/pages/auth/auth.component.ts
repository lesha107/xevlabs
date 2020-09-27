import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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
export class AuthComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(
    private _router: Router,
    private _authService: AuthService,
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
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.signInWithPassword(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this._router.navigate(['admin']);
      });
  }

  signInWithPassword(
    data: SignIn
  ): Observable<Partial<firebase.auth.UserCredential>> {
    return this._authService.signIn(data).pipe(
      untilDestroyed(this),
      tap((data) => {
        this._userService.currentUser$.next(data.user);
      }),
      catchError((er) => {
        localStorage.setItem('user', null);
        this.showError(er.message);
        return throwError(er);
      })
    );
  }
  public showError(er): void {
    this._toastr.error(er);
  }
}
