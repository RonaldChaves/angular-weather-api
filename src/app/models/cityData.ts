// City data

export type CityData = {
    name: string,
    country: string| any, // Brazil, japan, etc...
    countryCode: string , // BR - JP - etc...
    coord: {
        lon: number,
        lat: number
    },
    countryBadge: any
}