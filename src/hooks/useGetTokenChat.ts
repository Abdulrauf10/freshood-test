import { useQuery } from "react-query"
import { getGenerateTokenChat } from "@/services/api/auth"
import { ResponseGenerateTokenChat } from "@/types/chat"

const useGetGenerateTokenChat = () => {
  const { data: dataGenerateToken, isLoading: 
    isLoadingGenerateToken
   } = useQuery<
    ResponseGenerateTokenChat,
    Error
  >(["generate-token-chat"], () =>{ 
    return getGenerateTokenChat()
  }, {
    onSuccess: (data) => {
      return data
    }
  })

  return { dataGenerateToken, isLoadingGenerateToken }
}

export default useGetGenerateTokenChat
