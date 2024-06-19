import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { createProductService } from "@/services/api/products"

type ProductFormInput = {
  productName: string
  subCategoryId: string
  price: string
  caseSize: string
  minOrderQty: string
  description?: string
  weight?: string
  dimension?: string
}

const schema = yup
  .object({
    productName: yup.string().required(),
    subCategoryId: yup.string().required(),
    price: yup.string().required(),
    caseSize: yup.string().required(),
    minOrderQty: yup.string().required()
  })
  .required()

const useProduct = () => {
  const toast = useToast()

  const form = useForm<ProductFormInput>({
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
    // mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit
  }
}

export default useProduct
