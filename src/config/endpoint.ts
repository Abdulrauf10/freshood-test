export const BASE_API_URL = process.env.NEXT_PUBLIC_FRESHOOD_API_URL

export const LOGIN_API_URL = `${BASE_API_URL}/users/login`
export const LOGOUT_API_URL = `${BASE_API_URL}/users/logout`
export const REGISTER_API_URL = `${BASE_API_URL}/users/register/create`
export const OTP_API_URL = `${BASE_API_URL}/users/register/send-email-otp`

export const AUTH = {
  ME: `${BASE_API_URL}/users/me`,
  COUNTRIES: `${BASE_API_URL}/users/data/countries`,
  VERIFICATION: `${BASE_API_URL}/users/register/verify-email-otp`,
  FORGOT_PASSWOR_SEND_EMAIL: `${BASE_API_URL}/users/password-reset/send-mail`
}

export const MERCHANT_INFO = {
  ABOUT: `${BASE_API_URL}/users/register/merchant-info`,
  PRODUCT_CATEGORIES: `${BASE_API_URL}/products/categories`
}
