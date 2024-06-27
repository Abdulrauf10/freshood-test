import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react"
import { contactUsService } from "@/services/api/helpCenter"

type ContactUsFormInput = {
  subject: string
  category: string
  description: string
  image?: File
}

const schema = yup
  .object({
    subject: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required()
  })
  .required()

const useContactUs = () => {
  const toast = useToast()

  const form = useForm<any>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: ContactUsFormInput) =>
      contactUsService(payload).then(() => {}),
    {
      onSuccess: (sessionId) => {
        form.reset()
        toast({
          title: "Success",
          description: "Send Contact Us",
          status: "success",
          duration: 2000,
          isClosable: true
        })
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Send Contact Us failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: ContactUsFormInput) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useContactUs
