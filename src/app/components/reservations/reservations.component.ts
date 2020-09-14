import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  user: User;
  isLoading = false;

  constructor(
    private reservationSvc: ReservationService,
    private auth: AuthService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.reservationSvc.reservations$
      .subscribe(res => {
        this.reservations = res;
        this.isLoading = false;
      });

    this.auth.user$.subscribe(user => this.user = user);

  }

  onGoBack() {
    this._location.back();
  }

}
