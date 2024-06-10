// City data

export type CityData = {
    name: string,
    country: string, // Brazil, japan, etc...
    countryCode: string, // BR - JP - etc...
    coord: {
        lon: number,
        lat: number
    },
}