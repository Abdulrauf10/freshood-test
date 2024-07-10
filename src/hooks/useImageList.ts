import { useQuery } from "react-query"
import { Image } from "@/types/product"
import { getImageUploadUrlService } from "@/services/api/uploadImage"

const useImageList = () => {
  const { data, isLoading } = useQuery<Image[], Error>(
    ["image-list"],
    () => getImageUploadUrlService(),
    {
      onSuccess: (data) => {
        return data
      }
    }
  )

  return { data, isLoading }
}

export default useImageList
