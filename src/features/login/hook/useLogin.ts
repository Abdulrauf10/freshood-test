import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { LOGIN_API_URL } from "@/config/endpoint"
import { LoginService } from "@/services/api/auth"

type LoginFormInput = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

const useLogin = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const form = useForm<LoginFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: LoginFormInput) => LoginService(payload),

    {
      onSuccess: (sessionId) => {
        replace("/")
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Login failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: LoginFormInput) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit
  }
}

export default useLogin
