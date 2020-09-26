import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
} from '@angular/fire/firestore';
import { SignIn, UserOptions } from '../models/UserOptions';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore
  ) {}

  signIn(data: SignIn): Observable<Partial<firebase.auth.UserCredential>> {
    return from(
      this._afAuth.signInWithEmailAndPassword(data.email, data.password)
    );
  }

  createUser(
    data: UserOptions
  ): Observable<Partial<firebase.auth.UserCredential>> {
    return from(
      this._afAuth.createUserWithEmailAndPassword(data.email, data.password)
    );
  }

  updateUsersData(
    data: Partial<firebase.auth.UserCredential>,
    options: UserOptions
  ): void {
    this._afs.collection('users').doc(data.user.uid).set(options);
  }
}
