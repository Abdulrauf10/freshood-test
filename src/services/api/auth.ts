import { LOGIN_API_URL } from "@/config/endpoint"
import apiCall from "../apiCall"

export const LoginService = async (payload: any) => {
  const res = await apiCall.post(LOGIN_API_URL, payload)
  return res.data
}
