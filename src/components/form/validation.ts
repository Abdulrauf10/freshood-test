import { FieldError } from "@/types/form"

export enum validation {
  required = "Required",
  email_invalid = "Email Invalid",
  min = "Field must have at least 1 items",
  max = "Field must be less than or equal to 8",
  phone_digit = "Field must be 8 digits",
  typeError = "This field is required"
}

export const validationError = (error: FieldError | undefined): string => {
  let errorText = ""
  switch (error?.type) {
    case "required":
      errorText = validation.required
      break
    case "email":
      errorText = validation.email_invalid
      break
    case "min":
      errorText = validation.min
      break
    case "max":
      errorText = validation.max
      break
    case "phone_digit":
      errorText = validation.phone_digit
      break
    case "typeError":
      errorText = validation.typeError
      break
  }

  return errorText
}
