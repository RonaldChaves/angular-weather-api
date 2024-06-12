// Type created to requests of apiURL

export type WeatherData = {
    coord: {
        lon: number,
        lat: number
    },
    weather: [{
        id: number,
        description: string,
        icon: string
    }],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    name: string,
    countryBage: any
}