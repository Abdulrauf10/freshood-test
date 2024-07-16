import {
  AUTH,
  LOGIN_API_URL,
  LOGOUT_API_URL,
  MERCHANT_INFO,
  OTP_API_URL,
  REGISTER_API_URL,
  ORDER_API_URL
} from "@/config/endpoint"
import apiCall from "../apiCall"

export const registerService = async (payload?: any) => {
  const res = await apiCall.post(REGISTER_API_URL, payload)
  return res.data
}

export const LoginService = async (payload: any) => {
  const res = await apiCall.post(LOGIN_API_URL, payload)
  return res
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

export const postMerchantInfo = async (payload: any) => {
  const res = await apiCall.post(MERCHANT_INFO.ABOUT, payload)
  return res.data
}

export const getCountries = async () => {
  const res = await apiCall.get(AUTH.COUNTRIES)
  return res.data
}

export const postVerification = async (payload: any) => {
  const res = await apiCall.post(AUTH.VERIFICATION, payload)
  return res.data
}

export const sendEmailForgotPassword = async (payload: any) => {
  const res = await apiCall.post(AUTH.FORGOT_PASSWOR_SEND_EMAIL, payload)
  return res.data
}

export const resetPassword = async (payload: any) => {
  const res = await apiCall.post(AUTH.PASSWORD_RESET, payload)
  return res.data
}

export const editPersonal = async (payload: any) => {
  const res = await apiCall.post(MERCHANT_INFO.PERSONAL_INFO, payload)
  return res.data
}

export const changePassword = async (payload: any) => {
  const res = await apiCall.post(AUTH.CHANGE_PASSWORD, payload)
  return res.data
}

export const getAddress = async () => {
  const res = await apiCall.get(AUTH.ADDRESS)
  return res.data
}

export const postAddress = async (payload: any) => {
  const res = await apiCall.post(AUTH.ADDRESS, payload)
  return res.data
}

export const updateAddress = async (payload: any, address_id: number) => {
  const res = await apiCall.post(`${AUTH.ADDRESS}/${address_id}`, payload)
  return res.data
}

export const deleteAddress = async (address_id: number) => {
  const res = await apiCall.delete(`${AUTH.ADDRESS}/${address_id}`)
  return res.data
}

export const getGenerateTokenChat = async () => {
  const res = await apiCall.post(ORDER_API_URL + '/chat' + "/generate-token", {})
  return res.data?.data
}