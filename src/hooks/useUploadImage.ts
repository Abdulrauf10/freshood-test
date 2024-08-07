import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import {
  awsPresignedUrlService,
  confirmImageUploadUrlService,
  uploadImageService
} from "@/services/api/uploadImage"

const useUploadImage = () => {
  const toast = useToast()

  const form = useForm<any>({})
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ file, folder }: any) => {
      try {
        const { data } = await awsPresignedUrlService({ folder })

        const result = await uploadImageService({
          key: data.presign_response.fields.key,
          AWSAccessKeyId: data.presign_response.fields.AWSAccessKeyId,
          policy: data.presign_response.fields.policy,
          signature: data.presign_response.fields.signature,
          "Content-Type": "image/png",
          file
        })

        if (result?.status === 204) {
          await confirmImageUploadUrlService(data)
        }
      } catch (error) {
        console.log("error", error)
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["image-list"])
        toast({
          title: "Success",
          description: "Upload Image",
          status: "success",
          duration: 2000,
          isClosable: true
        })
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

  const onSubmit = async (data: any) => {
    mutation.mutate(data)
  }

  return {
    ...form,
    onSubmit
  }
}

export default useUploadImage
