import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { userOptions } from '../models/userOptions';
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

  isAdmin(): Observable<userOptions> {
    return this.currentUser$.pipe(
      filter((user) => !!user?.uid),
      switchMap((user) =>
        this._afs.collection('users').doc<userOptions>(user.uid).valueChanges()
      )
    );
  }
}
