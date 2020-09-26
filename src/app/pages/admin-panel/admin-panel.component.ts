import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { options } from './selectOptions';

@UntilDestroy()
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public form;
  public fields = [
    {
      key: 'role',
      type: 'my-select',
    },
  ];

  filterType: string;
  campaignOne: FormGroup;
  date: any;

  public readonly roleSubject: BehaviorSubject<string>;
  public readonly dateSubject: BehaviorSubject<FilterDate>;
  public readonly paginationSubject: Subject<PaginationEvent>;

  public readonly originalItems$: Observable<responsedUserOptions[]>;
  public readonly filteredItems$: Observable<responsedUserOptions[]>;
  public readonly paginatedItems$: Observable<responsedUserOptions[]>;

  public paginatedItems: responsedUserOptions[];
  public readonly displayedColumns: string[];
  public readonly options: string[];

  public dataSource = [];
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      role: [''],
    });
    this.options = options;
    this.displayedColumns = ['name', 'number', 'email', 'role', 'birthday'];
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
    this.form.get('role').valueChanges.subscribe((x) => console.log('X', x));
    console.log(this.form.controls);
  }
  private getFilteredItems(): any {
    return combineLatest([
      this.originalItems$,
      this.roleSubject,
      this.dateSubject,
    ]).pipe(
      map(([originalItems, role, date]) => {
        // console.log('role1', role);
        // originalItems.filter((item) => {
        //   if (role !== undefined) {
        //     return item.role === role;
        //   }
        // });
        console.log('role2', originalItems);

        return originalItems
          .filter((item) => {
            if (role !== undefined) {
              return item.role === role;
            }
            return true;
          })
          .filter((item) => {
            if (date !== undefined) {
              return (
                item.birthday.seconds * 1000 >=
                  new Date(date.start).getTime() &&
                item.birthday.seconds * 1000 <= new Date(date.end).getTime()
              );
            }
            return true;
          });
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
        console.log('filterditems', filteredItems);
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.firstName) {
        this.createUser(result);
      }
    });
  }

  public onPageChange(event: PaginationEvent): void {
    this.paginationSubject.next(event);
  }
  public onChangeRole(event): void {
    console.log('work');
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
