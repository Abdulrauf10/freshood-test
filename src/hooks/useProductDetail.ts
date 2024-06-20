import { useQuery } from "react-query"
import { getProductDetail } from "@/services/api/product"
import { ProductResponse } from "@/types/product"

const useProductDetail = (id: string) => {
  const { data, isLoading } = useQuery<ProductResponse, Error>(
    ["product"],
    () => getProductDetail(id),
    {
      onSuccess: (data) => {
        console.log(data)
        return data
      }
    }
  )

  return { data, isLoading }
}

export default useProductDetail
