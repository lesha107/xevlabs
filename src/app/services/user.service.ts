import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { UserOptions } from '../models/UserOptions';
import { initFirestoreData } from '../utils/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$ = new BehaviorSubject<firebase.User>(null);
  public userList$ = new BehaviorSubject<firebase.User[]>(null);
  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore
  ) {}

  getUsers() {
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
