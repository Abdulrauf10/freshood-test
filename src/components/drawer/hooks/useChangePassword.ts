import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { changePassword, editPersonal } from "@/services/api/auth"

type PasswordFormInput = {
  current_password: string
  new_password: string
}

const schema = yup
  .object({
    current_password: yup.string().required(),
    new_password: yup.string().required()
  })
  .required()

const useChangePassword = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()
  const queryClient = useQueryClient()

  const form = useForm<PasswordFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: PasswordFormInput) => changePassword(payload),

    {
      onSuccess: () => {
        // queryClient.removeQueries("data-me")
        toast({
          title: "Success",
          description: "Password updated",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        replace("/password-confirmation")
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Update failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: PasswordFormInput) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useChangePassword
