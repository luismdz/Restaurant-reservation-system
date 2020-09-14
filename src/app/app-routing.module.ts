import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantDetailComponent } from './components/restaurants/restaurant-detail/restaurant-detail.component';
import { RestaurantsListComponent } from './components/restaurants/restaurants-list/restaurants-list.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { ReservationGuard } from './shared/guards/reservation-guard.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurants/:termino', component: RestaurantsListComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'reservations', component: ReservationsComponent, canActivate: [ReservationGuard] },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
