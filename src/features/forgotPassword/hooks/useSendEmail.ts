import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { sendEmailForgotPassword } from "@/services/api/auth"

type EmailFormInput = {
  email: string
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
  })
  .required()

const useSendEmail = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    if (timer > 0 && isTimerActive) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else {
      setIsTimerActive(false)
    }
  }, [timer, isTimerActive])

  const form = useForm<EmailFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: EmailFormInput) => sendEmailForgotPassword(payload),

    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Email sent. Please check your email",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        replace("/resend-email")
      },
      onError: (error: any) => {
        console.log(error)
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
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useSendEmail
