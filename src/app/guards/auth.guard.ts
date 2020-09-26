import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserOptions } from '../models/UserOptions';
import { AuthComponent } from '../pages/auth/auth.component';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isUser: firebase.User | null;
  constructor(
    private readonly _userService: UserService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    this.isUser = this._userService.currentUser$.getValue();
    if (!this.isUser) {
      this._router.navigate(['signIn']);
    }

    return this._userService.isAdmin().pipe(
      map((options: UserOptions) => options.role === 'admin'),
      tap((role) => {
        console.log('shit', role);
        if (!role) {
          this.showError();
          return of(false);
        }
      })
    );
  }
  public showError(): void {
    this._toastr.error('uve got a bad role', 'Major Error');
  }
}
