export type ProductCategories = {
  id: number
  name: string
  sub_categories: {
    id: number
    name: string
    category_id: number
  }[]
}

export type ProductCategoriesResponse = {
  data: ProductCategories[]
}

export type TrendingProduct = {
  id: string
  order: number
  sub_category: {
    id: number
    name: string
    category: {
      id: number
      name: string
    }
  }
  products: {
    id: number
    sub_category: {
      id: number
      name: string
      category: {
        id: number
        name: string
      }
    }
    name: string
    images: [
      {
        id: number
        url: string
      }
    ]
    store: {
      id: number
      name: string
      image: {
        id: number
        url: string
      }
    }
    currency: string
    price: string
    case_size: number
    minimum_order: number
    popularity_score: number
    favorites_count: number
    recommended_retail_price: string
    description: string
    weight: number
    dimension_length: number
    dimension_width: number
    dimension_height: number
  }[]
}

export type TrendingProductResponse = {
  data: TrendingProduct[]
}

export type TopBanners = {
  image: {
    id: number
    url: string
  }
  type: string
  url: string
  store_id: number
  product_id: number
  listing_id: string
  order: 2147483647
  status: string
}

export type TopBannersResponse = {
  data: TopBanners[]
}

export type Image = {
  id: number
  url: string
}
export type Store = {
  id: number
  name: string
  image: Image
}

export type Product = {
  id: number
  sub_category: {
    id: number
    name: string
    category: {
      id: number
      name: string
    }
  }
  name: string
  images: Image[]
  store: Store
  currency: string
  price: string
  case_size: number
  minimum_order: number
  popularity_score: number
  favorites_count: number
  recommended_retail_price: string
  description: string
  weight: number
  dimension_length: number
  dimension_width: number
  dimension_height: number
}

export type ProductResponse = {
  data: Product
}
