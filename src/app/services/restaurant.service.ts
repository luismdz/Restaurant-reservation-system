import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap, debounceTime, distinctUntilChanged, share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private cities = [];

  constructor(
    private http: HttpClient
  ) {
    this.loadCities().subscribe(cities => this.cities = cities);
  }

  private getCountries() {

    return this.http.get('https://opentable.herokuapp.com/api/countries')
      .pipe(
        map((response: any) => response['countries']),
        mergeMap((codes: any[]) => {
          return forkJoin(
            codes.map(code => {
              return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
                .pipe(
                  map((res: any) => {

                    const country = {
                      code,
                      name: res.translations.es,
                      currency: res.currencies[0].symbol
                    }

                    return country;
                  })
                )
            })
          )
        })
      )

  }

  getCities(term: Observable<String>) {

    return term
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(term => {

          term = term === '' ? 'a' : term === null ? 'a' : term;

          return this.cities.filter(city => city?.toLowerCase().includes(term)).slice(0, 10);
        }),
        share()
      );
  }

  private loadCities() {

    return this.http.get('https://opentable.herokuapp.com/api/cities')
      .pipe(
        map((response: any) => response['cities']),
        share()
      );

  }

  getRestaurantsByName(term: Observable<String>) {

    return term
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        mergeMap(term => {

          term = term === '' ? 'a' : term === null ? 'a' : term;

          return this.http.get(`https://opentable.herokuapp.com/api/restaurants?name=${term}`)
            .pipe(
              share(),
            );
        }),
      )
  }

  getRestaurantsByCity(city: string) {

    return this.http.get(`https://opentable.herokuapp.com/api/restaurants?city=${city}`)
      .pipe(
        map(data => {
          let restaurants = data['restaurants'];
          restaurants = restaurants.map(r => r.image_url = 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');

          return { restaurants, ...data }
        }),
        share(),
      );
  }

  getRestaurantsByPage(city: string, page: number) {

    return this.http.get(`https://opentable.herokuapp.com/api/restaurants?city=${city}&page=${page}`)
      .pipe(
        map(data => {
          let restaurants = data['restaurants'];

          restaurants = restaurants.map(r => r.image_url = 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');

          return { restaurants, ...data }
        }),
        share(),
      );
  }

  getRestaurant(id: string) {

    return this.http.get(`https://opentable.herokuapp.com/api/restaurants/${id}`)
      .pipe(
        map((response: any) => {

          response.image_url = 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

          return response;
        }),
        mergeMap(response => {
          return this.getCountries()
            .pipe(
              map(countries => {
                const country = countries.find(c => c.code === response.country);

                response.country = country;

                return response;
              })
            )
        }),
        share(),
      );
  }


}
