import { useQuery } from "react-query"
import { Image } from "@/types/product"
import { getImageUploadUrlService } from "@/services/api/uploadImage"

const useImageList = (sortBy = "asc") => {
  const { data, isLoading } = useQuery<Image[], Error>(
    ["image-list"],
    () => getImageUploadUrlService(),
    {
      onSuccess: (data) => {
        return data
      }
    }
  )

  let newData = []
  if (sortBy === "desc") {
    if (data?.length) {
      for (let i = data.length - 1; i >= 0; i--) {
        newData.push(data[i])
      }
    }
  }

  return { data: sortBy === "desc" ? newData : data, isLoading }
}

export default useImageList
