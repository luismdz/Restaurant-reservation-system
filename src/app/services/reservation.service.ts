import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, forkJoin, of } from 'rxjs';

import { Reservation } from '../shared/models/reservation.model';
import { User } from '../shared/models/user.model';

import { AuthService } from './auth.service';
import { tap, switchMap, mergeMap, take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations$: Observable<Reservation[]>;
  private reservationsCol: AngularFirestoreCollection<Reservation>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {

    this.reservationsCol = this.afs.collection<Reservation>('reservations');

    this.reservations$ = this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        return this.getUserReservations(user.uid)
      })
    );

  }

  addReservation(reservation: Reservation) {
    reservation.createdAt = Date.now();

    return this.reservationsCol.add(reservation);
  }

  getUserReservations(uid: string) {

    if (uid) {
      console.log(uid);

      return this.afs.collection<Reservation>('reservations', ref => 
        ref.where('user.uid', '==', uid)
          .orderBy('date', 'desc')).valueChanges({ idField: 'id' });
    }

  }

}
