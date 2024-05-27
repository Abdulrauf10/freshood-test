import { ReactElement } from "react"
import { MultipleFieldErrors, Ref, Message } from "react-hook-form"

export type IFormData = {
  append: (name: string, value: any, fileName?: string) => void
}

export type FieldError = {
  type?: string | undefined
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

export type SelectOptionType = {
  value: number | string
  label: string | number
}

export type ActionList = {
  id?: string
  label: string
  icon?: ReactElement
}

export enum FieldType {
  textfield = "textfield",
  textarea = "textarea",
  date = "date",
  number = "number"
}

export type ControlledTextFieldProps = {
  label?: string
  control?: any
  name: string
  isTextArea?: boolean
  isRequiredField?: boolean
  placeholder?: string
  fieldType?: FieldType | string
  errors?: any
}
