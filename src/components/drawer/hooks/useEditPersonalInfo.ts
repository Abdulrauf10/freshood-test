import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { editPersonal } from "@/services/api/auth"

type PersonalInfoFormInput = {
  title: string
  first_name: string
  last_name: string
}

const schema = yup
  .object({
    title: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required()
  })
  .required()

const useEditPersonalInfo = () => {
  const { replace } = useRouter()
  const { setSessionId } = useSessionStore()
  const toast = useToast()
  const queryClient = useQueryClient()

  const form = useForm<PersonalInfoFormInput>({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(
    async (payload: PersonalInfoFormInput) => editPersonal(payload),

    {
      onSuccess: () => {
        queryClient.removeQueries("data-me")
        toast({
          title: "Success",
          description: "Data updated",
          status: "success",
          duration: 2000,
          isClosable: true
        })
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Update failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (data: PersonalInfoFormInput) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    mutation
  }
}

export default useEditPersonalInfo
