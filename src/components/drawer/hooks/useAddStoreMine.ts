import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { postProductMine } from "@/services/api/product"

type StoreFormInput = {
  name: string
  image_id: number
}

const schema = yup
  .object({
    name: yup.string().required(),
    image_id: yup.number().required()
  })
  .required()

const useAddStoreMine = (imageId: any) => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()
  const queryCLient = useQueryClient()

  const form = useForm<StoreFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: StoreFormInput) => postProductMine(payload),

    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Data saved",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        queryCLient.removeQueries("product-mine")
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Login failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: StoreFormInput) => {
    const { name, image_id } = data
    const newPayload: StoreFormInput = { name: name, image_id: imageId }
    mutation.mutate(newPayload)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useAddStoreMine
