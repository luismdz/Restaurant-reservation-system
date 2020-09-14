import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { Reservation } from '../../../shared/models/reservation.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {

  reservationForm: FormGroup;
  restaurant: Restaurant;
  numbers = [];
  images = [];
  isLoading = false;
  user: User;

  reservation: Reservation;

  constructor(
    private rs: RestaurantService,
    private auth: AuthService,
    private reservationSvc: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _loc: Location,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {

    this.initForm();

    this.route.params.subscribe(params => {
      const id = params['id'];

      this.isLoading = true;

      this.rs.getRestaurant(id)
        .subscribe((data: Restaurant) => {

          this.restaurant = data;

          console.log(data);
          this.isLoading = false;
        })
    });

    for (let i = 0; i < 12; i++) {
      this.numbers.push(i + 1);
    }

    this.images = [
      'assets/img/restaurant-1.jpg',
      'assets/img/restaurant-2.jpg',
      'assets/img/restaurant-3.jpg',
    ];

    this.auth.user$.subscribe(user => this.user = user);
  }

  initForm() {

    this.reservationForm = this.fb.group({
      numberOfPeople: new FormControl('', Validators.required),
      reservationDate: new FormControl(null, Validators.required),
      reservationTime: new FormControl(null, Validators.required)
    });

  }

  disabledDate = (current: Date): boolean => {
    const today = new Date();
    return today > current && today.getDate() !== current.getDate();
  }

  onSubmit() {

    for (const i in this.reservationForm.controls) {
      this.reservationForm.controls[i].markAsTouched();
      this.reservationForm.controls[i].updateValueAndValidity();
    }

    if (this.reservationForm.invalid) { return; }

    if (!this.user) {
      // this.router.navigateByUrl('/auth/login');
      this.confirm();
    } else {

      const { numberOfPeople, reservationDate, reservationTime } = this.reservationForm.value;

      const newReservation: Reservation = {
        cantidadPersonas: numberOfPeople,
        date: reservationDate.getTime(),
        time: reservationTime.getTime(),
        user: this.user,
        restaurant: this.restaurant
      }

      console.log(newReservation);

      this.reservationSvc.addReservation(newReservation)
        .then(() => this.success())

      this.reservationForm.reset();

    }

  }

  onGoBack() {
    this._loc.back();
  }

  success(): void {

    this.modal.success({
      nzTitle: 'Reservación creada exitosamente!',
      nzContent: `Nueva reservación en ${this.restaurant.name} creada exitosamente.`,
      nzOnOk: () => new Promise(resolve => setTimeout(() => resolve(this.router.navigateByUrl('/reservations')), 1000))
    });

  }

  confirm(): void {
    this.modal.confirm({
      nzTitle: 'Debe registrarse o iniciar sesión',
      nzContent: `Para realizar una reservación debe ser un usuario registrado en el sistema.`,
      nzOnOk: () => new Promise(resolve => setTimeout(() => resolve(this.router.navigateByUrl('/auth/login')), 1000))
    });
  }

}
