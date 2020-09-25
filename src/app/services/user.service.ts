import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { responsedUserOptions, UserOptions } from '../models/UserOptions';
import { initFirestoreData } from '../utils/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$ = new BehaviorSubject<firebase.User>(null);
  public userList$ = new BehaviorSubject<firebase.User[]>(null);
  constructor(private _afs: AngularFirestore) {}

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
