import { listProductService } from "@/services/api/products"
import { useInfiniteQuery } from "react-query"

const useListProduct = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery<any, Error>("product-list", listProductService, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    }
  })

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  }
}

export default useListProduct
