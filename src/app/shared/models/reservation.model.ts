import { Restaurant } from './restaurant.model';
import { User } from './user.model';

export interface Reservation {
    id?: string,
    user: User,
    restaurant: Restaurant,
    cantidadPersonas: number,
    date: number,
    time: number,
    createdAt?: number
}