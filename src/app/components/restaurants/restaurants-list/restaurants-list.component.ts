import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {

  info = {
    restaurants: [],
    currentPage: 0,
    totalPages: 0,
    totalEntries: 0
  }

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private rs: RestaurantService,
    private _loc: Location
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const ciudad = params['termino'];

      this.isLoading = true;

      this.rs.getRestaurantsByCity(ciudad)
        .subscribe(data => {

          this.info = {
            restaurants: data['restaurants'],
            currentPage: data['current_page'],
            totalPages: Math.ceil(data['total_entries'] / data['per_page']),
            totalEntries: data['total_entries']
          }
          console.log(this.info);

          this.isLoading = false;
        });

    })
  }

  onPageChange(pageNumber: number) {

    this.rs.getRestaurantsByPage(this.info.restaurants[0].city, pageNumber)
      .subscribe(data => this.info.restaurants = data['restaurants']);


  }

  onGoBack() {
    this._loc.back();
  }

}
