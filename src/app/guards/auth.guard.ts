import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserOptions } from '../models/UserOptions';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _userService: UserService,
    private readonly _toastr: ToastrService,
    private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._userService.isAdmin().pipe(
      map((options: UserOptions) => options.role === 'admin'),
      tap((role) => {
        if (!role) {
          this._router.navigate(['signIn']);
          this.showError();
        }
      })
    );
  }
  public showError(): void {
    this._toastr.error('uve got a bad role');
  }
}
