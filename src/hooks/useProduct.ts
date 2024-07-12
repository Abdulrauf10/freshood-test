import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { createProductService } from "@/services/api/products"
import { useRouter } from "next/navigation"
import { ProductResponse } from "@/types/product"

type ProductFormInput = {
  name: string
  sub_category_id: string
  currency: string
  price: number
  case_size: number
  minimum_order: number
  recommended_retail_price: number
  description?: string
  weight?: number
  dimension_length?: number
  dimension_width?: number
  dimension_height?: number
  image_ids: number[]
}

const schema = yup
  .object({
    name: yup.string().required(),
    sub_category_id: yup.string().required(),
    price: yup.number().required(),
    case_size: yup.number().required(),
    minimum_order: yup.number().required(),
    image_ids: yup.array().of(yup.number().required()).required().min(1),
    description: yup
      .string()
      .test("len", (val) => (val ? val.length <= 250 : true))
      .nullable()
  })
  .required()

export const cleanData = (data: any): any => {
  const cleanedData = { ...data }
  Object.keys(cleanedData).forEach((key) => {
    if (cleanedData[key] === "") {
      delete cleanedData[key]
    }
  })
  return cleanedData
}

const useProduct = () => {
  const toast = useToast()
  const { push } = useRouter()

  const form = useForm<any>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: ProductFormInput) => createProductService(payload),
    {
      onSuccess: (data: ProductResponse) => {
        push(`/merchant/products/${data?.data?.id}`)
        toast({
          title: "Success",
          description: "Create Product",
          status: "success",
          duration: 2000,
          isClosable: true
        })
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Create Product failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: ProductFormInput) => {
    const cleanedData = cleanData(data)
    mutation.mutate(cleanedData)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useProduct
