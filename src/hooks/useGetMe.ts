import { useQuery } from "react-query"
import { getMe } from "@/services/api/auth"
import { DataMeResponse } from "@/types/users"

const useGetMe = () => {
  const { data: dataMe, isLoading: isLoadingMe } = useQuery<
    DataMeResponse,
    Error
  >(["data-me"], () => getMe(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataMe, isLoadingMe }
}

export default useGetMe
