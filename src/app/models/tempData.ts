export type TemperatureData = {
    weather: [{
        description: string,
        icon: string
    }],
    main: {
        temp: number,
        feels_like: number,
        temp_max: number,
        temp_min: number
    }
}