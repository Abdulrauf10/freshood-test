import { CREATE_PRODUCT_API_URL } from "@/config/endpoint"
import apiCall from "../apiCall"

export const createProductService = async (payload?: any) => {
  const res = await apiCall.post(CREATE_PRODUCT_API_URL, payload)
  return res.data
}
