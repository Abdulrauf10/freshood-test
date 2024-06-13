import { useQuery } from "react-query"
import { getProductCategories } from "@/services/api/product"
import { ProductCategoriesResponse } from "@/types/product"

const useProductCategories = () => {
  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery<
    ProductCategoriesResponse,
    Error
  >(["product-categories"], () => getProductCategories(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataCategories, isLoadingCategories }
}

export default useProductCategories
