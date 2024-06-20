import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { createProductService } from "@/services/api/products"

type ProductFormInput = {
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

const useProduct = () => {
  const toast = useToast()

  const form = useForm<any>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: ProductFormInput) =>
      createProductService(payload).then((data) => {
        console.log(payload)
        console.log("resp: ", data)
      }),
    {
      onSuccess: (sessionId) => {
        console.log("sess :", sessionId)
      },
      onError: (error: any) => {
        console.log(error)
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
    console.log(data)
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit
  }
}

export default useProduct
