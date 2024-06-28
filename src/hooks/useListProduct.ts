import { getProductMine } from "@/services/api/product"
import { listProductService } from "@/services/api/products"
import {
  ListProductParam,
  ProductResponse,
  ProductResponses
} from "@/types/product"
import { useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useInfiniteQuery, useMutation, useQuery } from "react-query"

type ProductFormInput = {
  name: string
  sub_category_id: string
  currency: string
  price: string
  case_size: string
  minimum_order: string
  recommended_retail_price: string
  description?: string
  weight?: string
  dimension_length?: string
  dimension_width?: string
  dimension_height?: string
  image_ids: number[]
}

const useListProduct = ({ initPage }: { initPage: number }) => {
  1
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery<any, Error>(
    "product-list",
    async () => {
      const store = await getProductMine()
      return listProductService({
        page_number: initPage,
        store_ids: [store.data.id]
      })
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.offset
      }
    }
  )

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
