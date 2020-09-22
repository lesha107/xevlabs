import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { userOptions } from 'src/app/models/userOptions';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

// const roleSubject = new Subject();
// const dateSubject = new Subject();
// const pagintationSubject = new Subject<any>();

// const originalItems$ = new Observable<any[]>();

// const filteredItems$ = combineLatest([
//   originalItems$,
//   roleSubject,
//   dateSubject,
// ]).pipe(
//   map(([originalItems, role, date]) =>
//     originalItems.filter((item) => item.role === role && item.date === date)
//   )
// );

// const paginatedItems$ = combineLatest([
//   filteredItems$,
//   pagintationSubject,
// ]).pipe(
//   map(([filteredItems, pagination]) =>
//     filteredItems.splice(pagination.page * pagination.per_page, pagination.limit)
//   )
// );

@UntilDestroy()
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  usersList: any[];
  paginationList: any[];
  filterType: string;
  campaignOne: FormGroup;
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {
    this._userService.getUsers().subscribe((e) => {
      this.usersList = [...e];
      this.OnPageChange({
        length: 0,
        pageIndex: 0,
        pageSize: 1,
        previousPageIndex: 0,
      });
    });
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

    this.campaignOne.valueChanges.subscribe((e) => console.log('date1', e));
  }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.createUser(result);
    });
  }

  OnPageChange(event: PageEvent) {
    const arr = [...this.usersList];
    console.log('event', event);
    console.log('event', this.usersList);
    this.paginationList = arr.splice(
      event.pageIndex * event.pageSize,
      event.pageSize
    );
  }

  createUser(userOption) {
    this._authService
      .createUser(userOption)
      .pipe(
        tap((data) => {
          this._authService.updateUsersData(data, userOption);
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe();
  }
}
