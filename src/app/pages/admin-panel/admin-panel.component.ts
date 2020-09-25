import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { FilterDate } from 'src/app/models/date';
import { PaginationEvent } from 'src/app/models/pagination';
import { responsedUserOptions } from 'src/app/models/UserOptions';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  filterType: string;
  campaignOne: FormGroup;
  date: any;

  public readonly roleSubject: BehaviorSubject<string>;
  public readonly dateSubject: BehaviorSubject<FilterDate>;
  public readonly paginationSubject: Subject<PaginationEvent>;

  public readonly originalItems$: Observable<responsedUserOptions[]>;
  public readonly filteredItems$: Observable<responsedUserOptions[]>;
  public readonly paginatedItems$: Observable<responsedUserOptions[]>;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {
    this.roleSubject = new BehaviorSubject(null);
    this.dateSubject = new BehaviorSubject(null);
    this.paginationSubject = new Subject<any>();

    this.originalItems$ = this._userService.getUsers();
    this.filteredItems$ = this.getFilteredItems();
    this.paginatedItems$ = this.getPaginatedItems();

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 1)),
      end: new FormControl(new Date(year, month, 28)),
    });

    this.campaignOne.valueChanges.subscribe((e) => this.dateSubject.next(e));
  }
  ngOnInit(): void {
    this.roleSubject.next(this.filterType);
    this.dateSubject.next(this.date);
  }
  private getFilteredItems(): any {
    return combineLatest([
      this.originalItems$,
      this.roleSubject,
      this.dateSubject,
    ]).pipe(
      map(([originalItems, role, date]) => {
        originalItems.filter((item) => {
          if (role) {
            return item.role === role;
          }
        });
        return originalItems.filter(({ birthday: { seconds } }) => 
          date ? seconds * 1000 >= new Date(date.start).getTime() && seconds * 1000 <= new Date(date.end).getTime() : true
        );
      }),
      tap(() => {
        this.paginationSubject.next({
          length: 0,
          pageIndex: 0,
          pageSize: 1,
          previousPageIndex: 0,
        });
      })
    );
  }
  private getPaginatedItems(): Observable<responsedUserOptions[]> {
    return combineLatest([this.filteredItems$, this.paginationSubject]).pipe(
      map(([filteredItems, pagination]) => {
        return [...filteredItems].splice(
          pagination.pageIndex * pagination.pageSize,
          pagination.pageSize
        );
      })
    );
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((result) => {
      if (result.firstName) {
        this.createUser(result);
      }
    });
  }

  public onPageChange(event: PaginationEvent): void {
    this.paginationSubject.next(event);
  }
  public onChangeRole(event): void {
    this.roleSubject.next(event.value);
  }
  public createUser(userOption): void {
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
