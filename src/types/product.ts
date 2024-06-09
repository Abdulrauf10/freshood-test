type ProductCategories = {
  id: number
  name: string
  sub_categories: {
    id: number
    name: string
    category_id: number
  }[]
}

type ProductCategoriesResponse = {
  data: ProductCategories[]
}
