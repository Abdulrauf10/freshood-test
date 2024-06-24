import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { postMerchantInfo, sendOtp } from "@/services/api/auth"

type MerchantFormInput = {
  store_name: string
  website_url?: string | null
  products_count_range: string
  primary_category_ids: number[]
  sub_category_ids: number[]
  heard_from: string[]
  about_your_business: string
}

const schema = yup
  .object({
    store_name: yup.string().required(),
    website_url: yup.string().url().notRequired().nullable(),
    products_count_range: yup.string().required(),
    primary_category_ids: yup.array().of(yup.number().required()).required(),
    sub_category_ids: yup.array().of(yup.number().required()).required(),
    heard_from: yup.array().of(yup.string().required()).required(),
    about_your_business: yup.string().required()
  })
  .required()

const useMerchantInfo = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()

  const form = useForm<MerchantFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: MerchantFormInput) => postMerchantInfo(payload),
    {
      onSuccess: async () => {
        toast({
          title: "Success",
          description: "Merchant information submitted successfully",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        sendOtp()
        replace("/verification")
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Submission failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (payload: MerchantFormInput) => {
    mutation.mutate(payload)
  }

  return {
    ...form,
    onSubmit
  }
}

export default useMerchantInfo
