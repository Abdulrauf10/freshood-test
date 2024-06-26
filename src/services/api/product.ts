import { MERCHANT_INFO } from "@/config/endpoint"
import apiCall from "../apiCall"

export const getProductCategories = async () => {
  const res = await apiCall.get(MERCHANT_INFO.PRODUCT_CATEGORIES)
  return res.data
}
export const getTrendingProducts = async () => {
  const res = await apiCall.get(MERCHANT_INFO.TREND_PRODUCTS)
  return res.data
}

export const getTopBanners = async () => {
  const res = await apiCall.get(MERCHANT_INFO.TOP_BANNERS)
  return res.data
}

export const getProductDetail = async (id: string) => {
  const res = await apiCall.get(`${MERCHANT_INFO.PRODUCT_DETAIL}/${id}`)
  return res.data
}

export const getProductMine = async () => {
  const res = await apiCall.get(MERCHANT_INFO.PRODUCT_MINE)
  return res.data
}

export const postProductMine = async (payload: any) => {
  const res = await apiCall.post(MERCHANT_INFO.PRODUCT_MINE, payload)
  return res.data
}
