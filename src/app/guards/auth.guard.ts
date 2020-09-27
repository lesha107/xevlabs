import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserOptions } from '../models/UserOptions';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isUser: firebase.User | null;
  constructor(
    private readonly _userService: UserService,
    private readonly _toastr: ToastrService,
    private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    this.isUser = this._userService.currentUser$.getValue();
    if (localStorage.getItem('user')) {
      return of(true);
    }
    if (!this.isUser) {
      this._router.navigate(['signIn']);
    }
    return this._userService.getUserOptions().pipe(
      map((options: UserOptions) => options.role === 'admin'),
      tap((role) => {
        localStorage.setItem('user', 'true');
        if (!role) {
          this.showError();
        }
      })
    );
  }
  public showError(): void {
    this._toastr.error('uve got a bad role', 'Major Error');
  }
}
