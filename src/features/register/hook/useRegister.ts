import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { REGISTER_API_URL, OTP_API_URL } from "@/config/endpoint"

type RegisterFormInput = {
  user_type: string
  title: string
  first_name: string
  last_name: string
  email: string
  password: string
  country_code: string
  phone_number: string
  country_id: string
  city_id: string
  prefers_marketing_updates: boolean
}

const handlingTestPhoneDigit = (val: string | undefined) => {
  if (!val) {
    return true
  }
  if (val?.length != undefined) {
    return val?.length >= 8
  } else {
    return true
  }
}

const schema = yup
  .object({
    user_type: yup.string().required(),
    title: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    country_code: yup.string().required(),
    phone_number: yup
      .string()
      .required()
      .test("phone_digit", "Field must be 8 - 12 digits", (val) =>
        handlingTestPhoneDigit(val)
      ),
    country_id: yup.string().required(),
    city_id: yup.string().required(),
    prefers_marketing_updates: yup.boolean().required()
  })
  .required()

const useRegister = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const form = useForm<RegisterFormInput>({
    resolver: yupResolver(schema)
  })

  const sendOtp = async () => {
    const response = await fetch(OTP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })

    if (!response.ok) {
      throw new Error("Failed to send OTP")
    }

    return response.json()
  }

  const mutation = useMutation(
    async (payload: RegisterFormInput) => {
      await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: "include"
      })

      // if (!response.ok) {
      //   throw new Error("Registration failed")
      // }

      // const data = await response.json()
      // const sessionId = data.sessionId

      // if (!sessionId) {
      //   throw new Error("Failed to retrieve session ID")
      // }

      // return { sessionId, email: payload.email }
    },
    {
      onSuccess: async () => {
        // setSessionId(sessionId)
        // toast({
        //   title: "Success",
        //   description: "Registration successful",
        //   status: "success",
        //   duration: 2000,
        //   isClosable: true
        // })
        try {
          await sendOtp()
          toast({
            title: "OTP Sent",
            description: "An OTP code has been sent to your email",
            status: "success",
            duration: 2000,
            isClosable: true
          })
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message || "Failed to send OTP",
            status: "error",
            duration: 2000,
            isClosable: true
          })
        }
        // replace("/")
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Registration failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: RegisterFormInput) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit
  }
}

export default useRegister
