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
  sub_category_ids1?: any[] | null
  sub_category_ids2?: any[] | null
  sub_category_ids3?: any[] | null
  sub_category_ids4?: any[] | null
  sub_category_ids5?: any[] | null
  sub_category_ids6?: any[] | null
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
    sub_category_ids1: yup.array().notRequired().nullable(),
    sub_category_ids2: yup.array().notRequired().nullable(),
    sub_category_ids3: yup.array().notRequired().nullable(),
    sub_category_ids4: yup.array().notRequired().nullable(),
    sub_category_ids5: yup.array().notRequired().nullable(),
    sub_category_ids6: yup.array().notRequired().nullable(),
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
          description: error.error || "Submission failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (payload: MerchantFormInput) => {
    const {
      store_name,
      website_url,
      products_count_range,
      primary_category_ids,
      sub_category_ids,
      sub_category_ids1,
      heard_from,
      about_your_business
    } = payload

    const newPayload: MerchantFormInput = {
      store_name,
      website_url: website_url || "",
      products_count_range,
      primary_category_ids,
      sub_category_ids,
      sub_category_ids1,
      heard_from,
      about_your_business
    }
    mutation.mutate(newPayload)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useMerchantInfo
