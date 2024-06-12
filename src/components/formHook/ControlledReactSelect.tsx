import { FormControl, FormLabel, HStack, Box } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useController } from "react-hook-form"
import ReactSelect, { SelectProps } from "@/components/form/ReactSelect"

type ControlledReactSelect = {
  name: string
  label?: string
  errors: any
  placeholder?: string
  control: any
  handleChange?: (val: any) => void
  isRequiredField?: boolean
  isMulti?: any
  formAlign?: "horizontal" | "vertical"
  isClearAll?: boolean
  defaultSelectValue?: any
} & SelectProps

const ControlledReactSelect: FC<ControlledReactSelect> = ({
  name,
  label,
  errors,
  placeholder,
  control,
  handleChange,
  isRequiredField = false,
  isMulti = false,
  formAlign = "vertical",
  isClearAll = false,
  defaultSelectValue = null,
  ...props
}) => {
  const { field } = useController({ control, name })

  useEffect(() => {
    if (isClearAll) {
      field.onChange(undefined)
    }
  }, [isClearAll])

  useEffect(() => {
    if (defaultSelectValue) {
      field.onChange(defaultSelectValue)
    }
  }, [defaultSelectValue])

  const handleErrorsIfArray = (errors: any, fieldName: string) => {
    if (fieldName.includes(".")) {
      let splitName = fieldName.split(".")
      let parentName = splitName[0]
      let childName = splitName.slice(2)
      let nestedVal: any = null
      let lastKey: any = childName[childName.length - 1]
      const find = errors[parentName]?.find((el: any) => {
        if (childName.length && el) {
          nestedVal = childName.reduce((a, prop) => a?.[prop], el)
          return nestedVal?.ref?.name === fieldName
        } else {
          return el?.ref?.name == fieldName
        }
      })
      return childName?.length ? find?.[lastKey] : find
    } else {
      return errors[fieldName]
    }
  }

  return (
    <FormControl isRequired={isRequiredField}>
      {label && (
        <FormLabel fontSize="14px" fontWeight={600} htmlFor={field.name} mb="2">
          {label}
        </FormLabel>
      )}
      <ReactSelect
        {...field}
        {...props}
        // value={value}
        isMulti={isMulti}
        onChange={(val: any) => {
          !isMulti
            ? field.onChange(val !== null ? val : undefined)
            : field.onChange(val)
          handleChange?.(val)
        }}
        error={handleErrorsIfArray(errors, field.name)}
        placeholder={placeholder}
      />
    </FormControl>
  )
}

export default ControlledReactSelect
