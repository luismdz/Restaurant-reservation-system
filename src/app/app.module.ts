import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { NgZorroModule } from './ng-zorro.module';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';


// AngularFire & Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantsListComponent } from './components/restaurants/restaurants-list/restaurants-list.component';
import { RestaurantItemComponent } from './components/restaurants/restaurant-item/restaurant-item.component';
import { RestaurantDetailComponent } from './components/restaurants/restaurant-detail/restaurant-detail.component';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MapComponent } from './shared/components/map/map.component';
import { BuscadorComponent } from './shared/components/buscador/buscador.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { PhonePipe } from './shared/pipes/phone.pipe';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantsListComponent,
    RestaurantItemComponent,
    RestaurantDetailComponent,
    AuthComponent,
    NavbarComponent,
    MapComponent,
    BuscadorComponent,
    LoginComponent,
    RegisterComponent,
    ReservationsComponent,
    MenuComponent,
    PhonePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    NgZorroModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, PhonePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
