export interface Restaurant {
    id?: number,
    name: string,
    address: string,
    city: string,
    state: string,
    country: {
        code: string,
        name: string,
        currency: string
    },
    phone: string,
    price: number,
    image_url: string,
    lat: number,
    lng: number
}