export const BASE_API_URL = process.env.NEXT_PUBLIC_FRESHOOD_API_URL

export const LOGIN_API_URL = `${BASE_API_URL}/users/login`
export const LOGOUT_API_URL = `${BASE_API_URL}/users/logout`
export const REGISTER_API_URL = `${BASE_API_URL}/users/register/create`
export const OTP_API_URL = `${BASE_API_URL}/users/register/send-email-otp`

export const AUTH = {
  ME: `${BASE_API_URL}/users/me`
}
