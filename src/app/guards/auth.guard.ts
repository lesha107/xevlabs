import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this._userService.isAdmin().pipe(
      map((options) => options.role === 'admin'),
      catchError(() => of(false))
    );
  }
}
