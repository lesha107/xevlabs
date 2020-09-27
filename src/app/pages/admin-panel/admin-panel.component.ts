import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { FilterDate } from 'src/app/models/date';
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
export class AdminPanelComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly selectForm: FormGroup;
  // public readonly form: FormGroup;
  public readonly dateForm: FormGroup;

  // public readonly fields: FormlyFieldConfig[];
  public readonly selectFields: FormlyFieldConfig[];
  public readonly dateFields: FormlyFieldConfig[];

  public readonly roleSubject: BehaviorSubject<string>;
  public readonly dateSubject: BehaviorSubject<FilterDate>;

  public readonly originalItems$: Observable<responsedUserOptions[]>;
  public readonly filteredItems$: Observable<responsedUserOptions[]>;

  public displayedColumns: string[];
  public readonly options: string[];

  public dataSource: MatTableDataSource<responsedUserOptions>;
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) {
    // this.form = formBuilder.group({
    //   role: [''],
    //   date: [''],
    // });

    this.selectForm = formBuilder.group({
      role: [''],
    });

    this.dateForm = formBuilder.group({
      date: [''],
    });

    this.selectFields = [
      {
        fieldGroupClassName: 'formly',
        fieldGroup: [
          {
            className: 'formly',
            key: 'role',
            type: 'select',
            templateOptions: {
              options: [
                { value: 'admin', label: 'admin' },
                { value: 'user', label: 'user' },
                { value: undefined, label: 'All' },
              ],
            },
          },
        ],
      },
    ];

    this.dateFields = [
      {
        className: 'datepicker',
        key: 'date',
        type: 'date-picker',
      },
    ];

    // this.fields = [
    //   {
    //     fieldGroupClassName: 'formly',
    //     fieldGroup: [
    //       {
    //         className: 'select',
    //         key: 'role',
    //         type: 'select',
    //         templateOptions: {
    //           label: 'Filter by role',
    //           options: [
    //             { value: 'admin', label: 'admin' },
    //             { value: 'user', label: 'user' },
    //             { value: undefined, label: 'All' },
    //           ],
    //         },
    //       },
    //       {
    //         className: 'datepicker',
    //         key: 'date',
    //         type: 'date-picker',
    //         templateOptions: {
    //           label: 'Filter by BirthDay',
    //         },
    //       },
    //     ],
    //   },
    // ];
    this.options = options;
    this.displayedColumns = ['name', 'number', 'email', 'role', 'birthday'];
    this.roleSubject = new BehaviorSubject(null);
    this.dateSubject = new BehaviorSubject(null);

    this.originalItems$ = this._userService.getUsers();
    this.filteredItems$ = this.getFilteredItems();
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.roleSubject.next(undefined);
    this.dateSubject.next(undefined);
    this.selectForm
      .get('role')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((x) => this.roleSubject.next(x));
    this.dateForm.valueChanges.pipe(untilDestroyed(this)).subscribe((x) => {
      this.dateSubject.next(x.date);
    });
  }
  ngAfterViewInit(): void {
    this.filteredItems$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private getFilteredItems(): any {
    return combineLatest([
      this.originalItems$,
      this.roleSubject,
      this.dateSubject,
    ]).pipe(
      map(([originalItems, role, date]) => {
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

  public onChangeRole(event): void {
    this.roleSubject.next(event.value);
  }
  public async createUser(userOption): Promise<void> {
    try {
      let userData = await this._authService.createUser(userOption);
      this._authService.updateUsersData(userData, userOption);
    } catch (er) {
      throwError(er);
    }
    //   this._authService
    //     .createUser(userOption)
    //     .pipe(
    //       tap((data) => {
    //         this._authService.updateUsersData(data, userOption);
    //       }),
    //       catchError((err) => {
    //         return throwError(err);
    //       })
    //     )
    //     .subscribe();
  }
}
