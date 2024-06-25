import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { editProductService } from "@/services/api/products"
import { ProductResponse } from "@/types/product"
import { useRouter } from "next/navigation"

type EditProductFormInput = {
  id: string
  name: string
  sub_category_id: string
  currency: string
  price: string
  case_size: string
  minimum_order: string
  recommended_retail_price: string
  description?: string
  weight?: string
  dimension_length?: string
  dimension_width?: string
  dimension_height?: string
  image_ids: number[]
}

const schema = yup
  .object({
    name: yup.string().required(),
    sub_category_id: yup.string().required(),
    price: yup.string().required(),
    case_size: yup.string().required(),
    minimum_order: yup.string().required(),
    image_ids: yup.array().of(yup.number().required()).required().min(1)
  })
  .required()

const useEditProduct = (productId: string) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { push } = useRouter()
  const form = useForm<any>({
    resolver: yupResolver(schema)
  })
  let result: ProductResponse

  const mutation = useMutation(
    async (payload: EditProductFormInput) =>
      editProductService(payload).then((data) => {
        result = data
      }),
    {
      onSuccess: (sessionId) => {
        console.log(result.data.id)
        queryClient.invalidateQueries(["product", productId])
        push(`/merchant/product/${result.data.id}`)
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
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useEditProduct
