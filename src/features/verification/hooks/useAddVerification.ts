import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { postVerification } from "@/services/api/auth"

type OTPFormInput = {
  otp: string
}

const schema = yup
  .object({
    otp: yup
      .string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required")
  })
  .required()

const useAddVerification = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const form = useForm<OTPFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: OTPFormInput) => postVerification(payload),

    {
      onSuccess: () => {
        toast({
          title: "Successr",
          description: "Email has been verified",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        replace("/account-review")
      },
      onError: (error: any) => {
        // toast({
        //   title: "Error",
        //   description: "Wrong OTP",
        //   status: "error",
        //   duration: 2000,
        //   isClosable: true
        // })
      }
    }
  )

  const onSubmit = async (data: OTPFormInput) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useAddVerification
