export type Countries = {
  id: string
  name: string
  country_code: string
  cities: {
    id: string
    name: string
    country_id: string
  }[]
}

export type CountriesResponse = {
  data: Countries[]
}
