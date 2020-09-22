import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { userOptions } from '../models/userOptions';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  role: string;
  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this._userService.isAdmin().pipe(
      map((options) => options.role === 'admin'),
      catchError((er) => of(false))
    );
  }
}
