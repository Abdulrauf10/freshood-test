import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import useSessionStore from "@/store/useSessionStore"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { postAddress, updateAddress } from "@/services/api/auth"
import { AddrestList } from "@/types/users"
import { useEffect } from "react"
import { useDataEdit } from "@/store/useDataEdit"

type AddressFormInput = {
  contact_name: string
  contact_number: string
  email: string
  country: string
  province_state: string
  city: string
  address_line_1: string
  address_line_2?: string | null
  postal_code: string
  is_default?: boolean | null
}

const schema = yup
  .object({
    contact_name: yup.string().required(),
    contact_number: yup.string().required(),
    email: yup.string().email().required(),
    country: yup.string().required(),
    province_state: yup.string().required(),
    city: yup.string().required(),
    address_line_1: yup.string().required(),
    address_line_2: yup.string().notRequired().nullable(),
    postal_code: yup.string().required(),
    is_default: yup.boolean().notRequired().nullable()
  })
  .required()

const useAddAddress = (isEdit?: boolean, dataEdit?: AddrestList) => {
  const { replace } = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()
  const { setIsEdit, setPayload } = useDataEdit()

  const form = useForm<AddressFormInput>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (dataEdit) {
      const { reset } = form

      reset({
        contact_name: dataEdit?.contact_name,
        contact_number: dataEdit?.contact_number,
        email: dataEdit?.email,
        country: dataEdit?.country,
        province_state: dataEdit?.province_state,
        city: dataEdit?.city,
        address_line_1: dataEdit?.address_line_1,
        address_line_2: dataEdit?.address_line_2,
        postal_code: dataEdit?.postal_code
      })
    }
  }, [dataEdit, form])

  const mutation = useMutation(
    async (payload: AddressFormInput) => postAddress(payload),
    {
      onSuccess: async () => {
        toast({
          title: "Success",
          description: "Address information submitted successfully",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        queryClient.removeQueries(["address-list"])
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

  const mutationUpdate = useMutation(
    async (payload: any) => updateAddress(payload?.newPayload, payload.id),
    {
      onSuccess: async () => {
        toast({
          title: "Success",
          description: "Address information updated",
          status: "success",
          duration: 2000,
          isClosable: true
        })
        queryClient.removeQueries(["address-list"])
        setIsEdit(false)
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message || "Submission failed",
          status: "error",
          duration: 2000,
          isClosable: true
        })
      }
    }
  )

  const onSubmit = async (payload: AddressFormInput) => {
    const {
      contact_name,
      contact_number,
      email,
      country,
      province_state,
      city,
      address_line_1,
      address_line_2,
      postal_code,
      is_default
    } = payload

    const newPayload: AddressFormInput = {
      contact_name,
      contact_number,
      email,
      country,
      province_state,
      city,
      address_line_1,
      address_line_2,
      postal_code,
      is_default: true
    }
    if (!isEdit) {
      mutation.mutate(newPayload)
    } else {
      const id = dataEdit?.id
      const editPayload = { newPayload, id }
      mutationUpdate.mutate(editPayload)
    }
  }

  return {
    ...form,
    onSubmit,
    mutation,
    mutationUpdate
  }
}

export default useAddAddress
