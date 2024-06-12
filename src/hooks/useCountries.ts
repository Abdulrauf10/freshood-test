import { useQuery } from "react-query"
import { getCountries } from "@/services/api/auth"
import { CountriesResponse } from "@/types/users"

const useCountries = () => {
  const { data: dataCountries, isLoading: isLoadingCountries } = useQuery<
    CountriesResponse,
    Error
  >(["countries"], () => getCountries(), {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataCountries, isLoadingCountries }
}

export default useCountries
