import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { editProductService } from "@/services/api/products"
import { ProductResponse } from "@/types/product"
import { useRouter } from "next/navigation"
import { cleanData } from "./useProduct"

type EditProductFormInput = {
  id: string
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
    price: yup.string().required(),
    case_size: yup.string().required(),
    minimum_order: yup.string().required(),
    image_ids: yup.array().of(yup.number().required()).required().min(1),
    description: yup
      .string()
      .test("len", (val) => (val ? val.length <= 250 : true))
      .nullable()
  })
  .required()

const useEditProduct = (productId: string) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { push } = useRouter()
  const form = useForm<any>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: EditProductFormInput) => editProductService(payload),
    {
      onSuccess: (data: ProductResponse) => {
        queryClient.invalidateQueries(["product", productId])
        push(`/merchant/product/${data.data.id}`)
        toast({
          title: "Success",
          description: "Update Product",
          status: "success",
          duration: 2000,
          isClosable: true
        })
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Edit Product failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: EditProductFormInput) => {
    const cleanedData = cleanData(data)
    mutation.mutate(cleanedData)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useEditProduct
