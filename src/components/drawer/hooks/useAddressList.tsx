import { useQuery } from "react-query"
import { AddrestListResponse } from "@/types/users"
import { getAddress } from "@/services/api/auth"

const useAddressList = () => {
  const { data: dataAddress, isLoading: isLoadingAddress } = useQuery<
    AddrestListResponse,
    Error
  >(["address-list"], () => getAddress(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataAddress, isLoadingAddress }
}

export default useAddressList
