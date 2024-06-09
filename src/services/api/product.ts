import { MERCHANT_INFO } from "@/config/endpoint"
import apiCall from "../apiCall"

export const getProductCategories = async () => {
  const res = await apiCall.get(MERCHANT_INFO.PRODUCT_CATEGORIES)
  return res.data
}
