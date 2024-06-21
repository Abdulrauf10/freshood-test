import { useQuery } from "react-query"
import { getProductMine } from "@/services/api/product"
import { ProductMine } from "@/types/product"

const useGetProductMine = () => {
  const { data: dataProductMine, isLoading: isLoadingProductMine } = useQuery<
    ProductMine,
    Error
  >(["product-mine"], () => getProductMine(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataProductMine, isLoadingProductMine }
}

export default useGetProductMine
