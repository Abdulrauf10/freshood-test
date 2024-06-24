import { useQuery } from "react-query"
import { getProductDetail } from "@/services/api/product"
import { ProductResponse } from "@/types/product"

const useProductDetail = (id: string) => {
  const { data, isLoading } = useQuery<ProductResponse, Error>(
    ["product", id],
    () => getProductDetail(id),
    {
      onSuccess: (data) => {
        return data
      }
    }
  )

  return { data, isLoading }
}

export default useProductDetail
