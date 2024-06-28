import {
  CREATE_PRODUCT_API_URL,
  EDIT_PRODUCT_API_URL,
  PRODUCT_LIST_API_URL
} from "@/config/endpoint"
import apiCall from "../apiCall"

export const createProductService = async (payload?: any) => {
  const res = await apiCall.post(CREATE_PRODUCT_API_URL, payload)
  return res.data
}

export const editProductService = async (payload?: any) => {
  const res = await apiCall.post(
    `${EDIT_PRODUCT_API_URL}/${payload.id}/update`,
    payload
  )
  return res.data
}

export const listProductService = async (payload?: any) => {
  const res = await apiCall.post(`${PRODUCT_LIST_API_URL}`, {
    ...payload,
    page_size: 20
  })
  return res.data
}
