import { CONTACT_US_API_URL } from "@/config/endpoint"
import apiCall from "../apiCall"

export const contactUsService = async (payload?: any) => {
  const res = await apiCall.post(CONTACT_US_API_URL, payload)
  return res.data
}
