import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { RestaurantService } from '../../../services/restaurant.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  buscador: FormControl;
  selectedValue = '';
  searchedData = {
    locations: [],
    restaurants: []
  }

  isLoading = true;

  constructor(
    private rs: RestaurantService,
    private router: Router
  ) {
    this.buscador = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {

    const term = this.buscador.valueChanges;

    this.searchTerm(term);
  }

  searchTerm(termino: Observable<string>): void {
    this.isLoading = true;

    this.rs.getRestaurantsByName(termino)
      .subscribe(data => {

        this.searchedData.restaurants = data['restaurants'];

        this.isLoading = false;
      });

    this.rs.getCities(termino)
      .subscribe(cities => {

        this.searchedData.locations = cities;

        this.isLoading = false;
      });

  }

  onSubmit(form: NgForm) {

    const value = this.selectedValue;

    if (value === '') {
      form.controls.buscador.markAllAsTouched()
      return;
    }

    if (isNaN(+value)) {
      this.router.navigate(['restaurants', value]);
    } else {
      this.router.navigate(['restaurant', value]);
    }

  }
}
