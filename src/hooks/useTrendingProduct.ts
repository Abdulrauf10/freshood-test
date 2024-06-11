import { useQuery } from "react-query"
import { getTrendingProducts } from "@/services/api/product"
import { TrendingProductResponse } from "@/types/product"

const useTrendingProducts = () => {
  const { data: dataTrendingProducts, isLoading: isLoadingProducts } = useQuery<
    TrendingProductResponse,
    Error
  >(["trending-products"], () => getTrendingProducts(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataTrendingProducts, isLoadingProducts }
}

export default useTrendingProducts
