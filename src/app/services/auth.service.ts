import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UserOptions } from '../models/UserOptions';
// import ActionCodeSettings = firebase.auth.ActionCodeSettings;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore
  ) {}

  signIn(data: {
    email: string;
    password?: string;
  }): Observable<Partial<firebase.auth.UserCredential>> {
    return from(
      this._afAuth.signInWithEmailAndPassword(data.email, data.password)
    );
  }

  createUser(
    data: UserOptions
  ): Observable<Partial<firebase.auth.UserCredential>> {
    console.log('data', data);
    return from(
      this._afAuth.createUserWithEmailAndPassword(data.email, data.password)
    );
  }

  updateUsersData(data, options) {
    console.log('yeah', data);
    this._afs.collection('users').doc(data.user.uid).set(options);
  }
}
