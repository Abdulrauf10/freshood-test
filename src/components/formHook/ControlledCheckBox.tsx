import {
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  CheckboxProps
} from "@chakra-ui/react"
import { FC } from "react"
import { useController } from "react-hook-form"

type ControlledCheckboxProps = {
  control: any
  name: string
  label?: string
  handleChange?: (params1: any, params2?: string) => void
  watch?: any
} & CheckboxProps

const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
  control,
  name,
  label,
  handleChange,
  watch = undefined,
  ...props
}) => {
  const { field } = useController({ control, name })
  return (
    <Checkbox
      {...props}
      fontSize="12px"
      onChange={(e) => {
        field.onChange(e.target.checked)
        handleChange?.(e, name)
      }}
      value={watch ? watch(field.name)?.toString() : field.value}
      isChecked={
        props?.isChecked
          ? props?.isChecked
          : watch && watch(field.name)
          ? true
          : false
      }
    >
      {label && label}
    </Checkbox>
  )
}

export default ControlledCheckbox
