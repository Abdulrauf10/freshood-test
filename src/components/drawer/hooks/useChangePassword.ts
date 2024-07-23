import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import {
  changePassword,
  editPersonal,
  logoutService
} from "@/services/api/auth"

type PasswordFormInput = {
  current_password: string
  new_password: string
}

const schema = yup
  .object({
    current_password: yup.string().required(),
    new_password: yup
      .string()
      .required()
      .test("Password must be at least 8 characters", (val) =>
        handlingTestNewPassword(val)
      )
  })
  .required()

const handlingTestNewPassword = (val: string | undefined) => {
  if (!val) {
    return true
  }
  if (val?.length != undefined) {
    return val?.length >= 8
  } else {
    return true
  }
}

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
        logoutService()
        replace("/")
      },
      onError: (error: any) => {
        console.log(error)
        // toast({
        //   title: "Error",
        //   description:
        //     error?.response?.data?.message ||
        //     "Your Password must be at least 6 characters.",
        //   status: "error",
        //   duration: 2000,
        //   isClosable: true
        // })
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
