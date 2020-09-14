import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() restaurant: Restaurant;

  zoom = 18;
  center: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 24,
    minZoom: 8,
    draggable: false
  }

  marker = {
    position: {
      lat: 41.935137,
      lng: -87.662815
    },
    options: { animation: google.maps.Animation.DROP }
  }

  constructor() { }

  ngOnInit(): void {

    navigator.geolocation.getCurrentPosition(() => {
      this.center = {
        lat: 41.935137,
        lng: -87.662815
      }
    })

  }


}
