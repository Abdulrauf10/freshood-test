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

export type DataMeResponse = {
  data: {
    id: number
    user_type: string
    title: string
    first_name: string
    last_name: string
    email: string
    country_code: string
    phone_number: string
    country: string
    city: string
    prefers_marketing_updates: boolean
    registration_completed: boolean
    email_confirmed: boolean
    phone_confirmed: boolean
    buyer_info: {
      id: number
      type: string
      user: number
      interested_category_ids: number[]
      purpose_of_using: string[]
    }
    merchant_info: {
      id: number
      user: number
      store_name: string
      website_url: string
      products_count_range: string
      primary_category_ids: number[]
      sub_category_ids: number[]
      is_approved: boolean
      approved_at: string
    }
  }
}

export type AddrestList = {
  id: number
  user: number
  contact_name: string
  contact_number: string
  email: string
  country: string
  province_state: string
  city: string
  address_line_1: string
  address_line_2: string
  postal_code: string
  is_default: boolean
  created_at: string
}

export type AddrestListResponse = {
  data: AddrestList[]
}

export type DataMe = {
  id: number
  user_type: string
  title: string
  first_name: string
  last_name: string
  email: string
  country_code: string
  phone_number: string
  country: string
  city: string
  prefers_marketing_updates: boolean
  registration_completed: boolean
  email_confirmed: boolean
  phone_confirmed: boolean
  buyer_info?: {
    id: number
    type: string
    user: number
    interested_category_ids: number[]
    purpose_of_using: string[]
  }
  merchant_info: {
    id: number
    user: number
    store_name: string
    website_url: string
    products_count_range: string
    primary_category_ids: number[]
    sub_category_ids: number[]
    is_approved: boolean
    approved_at: string
  }
}
