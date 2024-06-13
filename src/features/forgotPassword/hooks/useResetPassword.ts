import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { resetPassword } from "@/services/api/auth"

type EmailFormInput = {
  token: string
  new_password: string
}

const handlePasswordLength = (val: string | undefined) => {
  if (!val) {
    return true
  }
  if (val?.length != undefined) {
    return val?.length >= 6
  } else {
    return true
  }
}

const schema = yup
  .object({
    token: yup.string().required(),
    new_password: yup
      .string()
      .required()
      .test("Password must be at least 6 characters", (val) =>
        handlePasswordLength(val)
      )
  })
  .required()

const useResetPassword = (tokenId: string) => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const form = useForm<EmailFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: EmailFormInput) => resetPassword(payload),

    {
      onSuccess: (sessionId) => {
        replace("/password-confirmation")
        toast({
          title: "Success",
          description: "Password reset successfully",
          status: "success",
          duration: 2000,
          isClosable: true
        })
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Email sending failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: EmailFormInput) => {
    const { token, new_password } = data
    const newPayload: EmailFormInput = {
      token: tokenId,
      new_password: new_password
    }
    mutation.mutate(newPayload)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useResetPassword
