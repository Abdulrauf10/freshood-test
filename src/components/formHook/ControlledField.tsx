import { FC, useState } from "react"
import { useController } from "react-hook-form"
import {
  FormControl,
  FormLabel,
  Skeleton,
  InputGroup,
  InputRightElement,
  Icon
} from "@chakra-ui/react"
import { IoMdEye as EyeIcon, IoMdEyeOff as EyeOffIcon } from "react-icons/io"
import { ControlledTextFieldProps, FieldType } from "@/types/form"
import InputText, { InputTextProps } from "../form/InputText"
import BaseTextArea from "../form/TextArea"
import NumberText, { NumberTextProps } from "../form/NumberText"

type ControlledField = {
  control?: any
  formAlign?: "horizontal" | "vertical"
  isLoading?: boolean
  handleChange?: (val: any) => void
  disabled?: boolean
} & ControlledTextFieldProps &
  InputTextProps &
  NumberTextProps

const ControlledField: FC<ControlledField> = ({
  fieldType,
  label,
  errors,
  placeholder,
  control,
  name,
  isRequiredField = false,
  isLoading = false,
  formAlign = "vertical",
  disabled = false,
  handleChange,
  fontSize,
  ...props
}) => {
  const { field } = useController({ control, name })
  const [isPasswordVisible, setPasswordVisibility] = useState(false)

  const TypeComponent = () => {
    let FieldComponent = null

    switch (fieldType) {
      case FieldType.textfield:
        FieldComponent = (
          <InputGroup>
            <InputText
              {...field}
              placeholder={placeholder}
              error={errors?.[field?.name]}
              type={
                field?.name === "password" && !isPasswordVisible
                  ? "password"
                  : "text"
              }
              onChange={(val: any) => {
                field.onChange(val)
                handleChange?.(val)
              }}
              fontSize={fontSize}
              {...props}
            />
            {field?.name === "password" && (
              <InputRightElement>
                <Icon
                  as={isPasswordVisible ? EyeOffIcon : EyeIcon}
                  onClick={() =>
                    setPasswordVisibility((isVisible) => !isVisible)
                  }
                  cursor="pointer"
                />
              </InputRightElement>
            )}
          </InputGroup>
        )
        break
      case FieldType.textarea:
        FieldComponent = (
          <BaseTextArea
            {...field}
            value={field.value ? field.value : ""}
            placeholder={placeholder}
            disabled={disabled}
            error={errors?.[field?.name]}
            fontSize={fontSize}
            {...props}
          />
        )
        break
      case FieldType.number:
        FieldComponent = (
          <NumberText
            {...field}
            value={field.value ? field.value : ""}
            _placeholder={placeholder}
            error={errors[field.name]}
            fontSize={fontSize}
            onWheel={(e) => {
              const target = e.target as HTMLInputElement | HTMLTextAreaElement
              target.blur()
            }}
            onKeyDown={(e) => {
              if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "e"
              ) {
                e.preventDefault()
              }
            }}
            {...props}
          />
        )
        break
      default:
        FieldComponent = null
    }

    return FieldComponent
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <FormControl isRequired={isRequiredField}>
        {label && (
          <FormLabel
            fontSize="12px"
            fontWeight={600}
            htmlFor={field.name}
            mb="2"
          >
            {label}
          </FormLabel>
        )}

        {TypeComponent()}
      </FormControl>
    </Skeleton>
  )
}

export default ControlledField
