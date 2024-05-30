import { LOGIN_API_URL, LOGOUT_API_URL } from "@/config/endpoint"
import apiCall from "../apiCall"

export const LoginService = async (payload: any) => {
  console.log("pay", payload)
  const res = await apiCall.post(LOGIN_API_URL, payload)
  return res.data
}

export const logoutService = async (payload?: any) => {
  const res = await apiCall.post(LOGOUT_API_URL, payload)
  return res.data
}
