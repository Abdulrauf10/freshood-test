import {
  CREATE_PRODUCT_API_URL,
  EDIT_PRODUCT_API_URL,
  PRODUCT_LIST_API_URL
} from "@/config/endpoint"
import apiCall from "../apiCall"
import { getProductMine } from "./product"

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

export const listProductService = async ({ pageParam = 1 }) => {
  try {
    const store = await getProductMine()
    const res = await apiCall.post(`${PRODUCT_LIST_API_URL}`, {
      page_number: pageParam,
      page_size: 6,
      store_ids: [store.data.id]
    })

    return {
      data: res.data.data,
      nextPage: res.data.data.length === 6 ? pageParam + 1 : undefined
    }
  } catch (error) {
    console.log(error)
  }
}
