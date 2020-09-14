import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from '../../../shared/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(
    private rs: RestaurantService
  ) { }

  ngOnInit(): void {

  }

}
