import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../shared/models/user.model';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )

  }

  async signUpWithEmailAndPassword({ firstName, lastName, email, password }: User) {

    try {

      const newUser: User = {
        firstName,
        lastName,
        email,
        displayName: `${firstName} ${lastName}`
      }

      const response = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log(response);
      newUser.uid = response.user.uid;

      return this.updateUserData(newUser);

    } catch (err) {
      console.log(err);
    }

  }

  async signInWithEmailAndPassword(email, password) {

    try {
      console.log(email, password);
      const response = await this.afAuth.signInWithEmailAndPassword(email, password);

      return this.updateUserData(response.user);

    } catch (err) {
      console.log(err);
    }

  }

  async googleSignIn() {

    const provider = new auth.GoogleAuthProvider();
    const credencial = await this.afAuth.signInWithPopup(provider);

    return this.updateUserData(credencial.user);
  }

  async signOut() {
    await this.afAuth.signOut();

    return this.router.navigate(['/']);
  }

  private updateUserData({
    uid,
    email,
    photoURL = '',
    displayName = '',
    firstName = '',
    lastName = ''
  }: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      photoURL,
      displayName,
      firstName,
      lastName
    };

    return userRef.set(data, { merge: true });
  }

}
