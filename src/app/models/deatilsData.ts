export type DetailsData = {
    main: {
        humidity: number
    },
    visibility: number, // maximium is 10km
    clouds: {
        all: number // 'nebulosidade', %
    },
    sys:{
        sunrise: number,
        sunset: number
    }
}