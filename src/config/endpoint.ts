export const BASE_API_URL = process.env.NEXT_PUBLIC_FRESHOOD_API_URL

export const LOGIN_API_URL = `${BASE_API_URL}/users/login`
export const LOGOUT_API_URL = `${BASE_API_URL}/users/logout`
export const REGISTER_API_URL = `${BASE_API_URL}/users/register/create`
export const OTP_API_URL = `${BASE_API_URL}/users/register/send-email-otp`
export const CREATE_PRODUCT_API_URL = `${BASE_API_URL}/products/stores/mine/create-product`
export const EDIT_PRODUCT_API_URL = `${BASE_API_URL}/products/products`
export const PRODUCT_LIST_API_URL = `${BASE_API_URL}/products/products/list`
export const UPLOAD_IMAGE_API_URL = `${BASE_API_URL}/products/medias`
export const AWS_S3_API_URL = `${process.env.NEXT_PUBLIC_AWS_S3_URL}`
export const CONTACT_US_API_URL = `${BASE_API_URL}/users/contact-us/submissions/submit`

export const AUTH = {
  ME: `${BASE_API_URL}/users/me`,
  COUNTRIES: `${BASE_API_URL}/users/data/countries`,
  VERIFICATION: `${BASE_API_URL}/users/register/verify-email-otp`,
  FORGOT_PASSWOR_SEND_EMAIL: `${BASE_API_URL}/users/password-reset/send-mail`,
  PASSWORD_RESET: `${BASE_API_URL}/users/password-reset/reset`,
  CHANGE_PASSWORD: `${BASE_API_URL}/users/change-password`,
  ADDRESS: `${BASE_API_URL}/users/addresses-list`
}

export const MERCHANT_INFO = {
  ABOUT: `${BASE_API_URL}/users/register/merchant-info`,
  PRODUCT_CATEGORIES: `${BASE_API_URL}/products/categories`,
  TREND_PRODUCTS: `${BASE_API_URL}/products/promo/trending-products`,
  TOP_BANNERS: `${BASE_API_URL}/products/promo/top-banners`,
  PERSONAL_INFO: `${BASE_API_URL}/users/profile/basic/update`,
  PRODUCT_DETAIL: `${BASE_API_URL}/products/products`,
  PRODUCT_MINE: `${BASE_API_URL}/products/stores/mine`
}
