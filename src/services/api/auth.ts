import {
  AUTH,
  LOGIN_API_URL,
  LOGOUT_API_URL,
  OTP_API_URL,
  REGISTER_API_URL
} from "@/config/endpoint"
import apiCall from "../apiCall"

export const registerService = async (payload?: any) => {
  const res = await apiCall.post(REGISTER_API_URL, payload)
  return res.data
}

export const LoginService = async (payload: any) => {
  const res = await apiCall.post(LOGIN_API_URL, payload)
  console.log(res)
  return res.request
}

export const logoutService = async (payload?: any) => {
  const res = await apiCall.post(LOGOUT_API_URL, payload)
  return res.data
}

export const getMe = async () => {
  const res = await apiCall.get(AUTH.ME)
  return res.data
}

export const sendOtp = async (payload?: any) => {
  const res = await apiCall.post(OTP_API_URL, payload)
  return res.data
}
