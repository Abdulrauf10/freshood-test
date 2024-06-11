import { useQuery } from "react-query"
import { getTopBanners } from "@/services/api/product"
import { TopBannersResponse } from "@/types/product"

const useTopBanners = () => {
  const { data: dataTopBanners, isLoading: isLoadingTopBanners } = useQuery<
    TopBannersResponse,
    Error
  >(["top-banners"], () => getTopBanners(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataTopBanners, isLoadingTopBanners }
}

export default useTopBanners
