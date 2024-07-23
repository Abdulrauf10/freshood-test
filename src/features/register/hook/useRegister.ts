import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { registerService } from "@/services/api/auth"

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
  prefers_marketing_updates?: boolean | null
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
    prefers_marketing_updates: yup.boolean().notRequired().nullable()
  })
  .required()

const useRegister = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const form = useForm<RegisterFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { country_code: "63" }
  })

  const mutation = useMutation(
    async (payload: RegisterFormInput) => registerService(payload),
    {
      onSuccess: async () => {
        // setSessionId(sessionId)
        toast({
          title: "Success",
          description: "Registration success",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        replace("/register-merchant-info")
      },
      onError: (error: any) => {
        console.log("val", error)
        toast({
          title: "Error",
          description: error?.response?.data?.message || "Registration failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (payload: RegisterFormInput) => {
    console.log("pay :", payload)
    const {
      user_type,
      title,
      first_name,
      last_name,
      email,
      password,
      country_code,
      phone_number,
      country_id,
      city_id,
      prefers_marketing_updates
    } = payload

    const newPayload: RegisterFormInput = {
      user_type: "Seller",
      title: title,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      country_code: country_code,
      phone_number: phone_number,
      country_id: country_id,
      city_id: city_id,
      prefers_marketing_updates: prefers_marketing_updates || false
    }
    mutation.mutate(newPayload)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useRegister
