import { useQuery } from "react-query"
import { getMe } from "@/services/api/auth"

const useGetMe = () => {
  const { data: dataMe, isLoading: isLoadingMe } = useQuery<any, Error>(
    ["data-me"],
    () => getMe(),
    {
      onSuccess: (data) => {
        return data
      }
    }
  )

  return { dataMe, isLoadingMe }
}

export default useGetMe
