import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { responsedUserOptions, UserOptions } from '../models/UserOptions';
import { initFirestoreData } from '../utils/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$: BehaviorSubject<firebase.User>;
  public userList$: BehaviorSubject<firebase.User[]>;

  constructor(private _afs: AngularFirestore) {
    this.currentUser$ = new BehaviorSubject(null);
    this.userList$ = new BehaviorSubject(null);
  }

  getUsers(): Observable<responsedUserOptions[]> {
    return this._afs
      .collectionGroup('users')
      .snapshotChanges()
      .pipe(map(initFirestoreData));
  }

  isAdmin(): Observable<UserOptions> {
    return this.currentUser$.pipe(
      filter((user) => !!user?.uid),
      switchMap((user) =>
        this._afs.collection('users').doc<UserOptions>(user.uid).valueChanges()
      )
    );
  }
}
