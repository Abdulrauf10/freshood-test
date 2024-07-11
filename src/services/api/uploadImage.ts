import { AWS_S3_API_URL, UPLOAD_IMAGE_API_URL } from "@/config/endpoint"
import apiCall from "../apiCall"

export const uploadImageService = async (payload?: any) => {
  const res = await apiCall.postAws(AWS_S3_API_URL, payload)
  return res
}

export const awsPresignedUrlService = async (payload?: any) => {
  const res = await apiCall.post(UPLOAD_IMAGE_API_URL, payload)
  return res.data
}

export const confirmImageUploadUrlService = async (payload?: any) => {
  const res = await apiCall.post(
    `${UPLOAD_IMAGE_API_URL}/${payload.media_id}/confirm-upload`,
    payload
  )
  return res.data
}

export const getImageUploadUrlService = async (payload?: any) => {
  const res = await apiCall.get(`${UPLOAD_IMAGE_API_URL}`, payload)
  return res.data.data
}
