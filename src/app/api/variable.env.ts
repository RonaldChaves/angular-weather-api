// File for hidden a api key on '.env'

import { KEY } from "./key.env";

//  require('dotenv').config() //require for return a environment variables
// const key = process.env["API_KEY"]; // api_key value



export const API = {
    production: false,
    apiKey: KEY.key
} // A object to return a key for all project