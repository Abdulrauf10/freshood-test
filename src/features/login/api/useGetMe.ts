import { useMutation, useQuery, useQueryClient } from "react-query"
import { getMe } from "@/services/api/auth"

const useGetMe = () => {
  const { data: dataMe, isLoading: isLoadingMe } = useQuery<any, Error>(
    ["dropdown-by-id"],
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
