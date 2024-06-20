import { AWS_S3_API_URL, UPLOAD_IMAGE_API_URL } from "@/config/endpoint"
import apiCall from "../apiCall"

export const uploadImageService = async (payload?: any) => {
  const res = await apiCall.postAws(AWS_S3_API_URL, payload)
  return res.data
}

export const awsPresignedUrlService = async (payload?: any) => {
  const res = await apiCall.post(UPLOAD_IMAGE_API_URL, payload)
  return res.data
}
