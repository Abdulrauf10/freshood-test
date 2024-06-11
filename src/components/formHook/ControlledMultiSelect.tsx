import { ControlledTextFieldProps } from "@/types/form"
import { Heading } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useController } from "react-hook-form"
import MultiSelectMenu, {
  MultiSelectCheckboxProps
} from "../form/MultiSelectCheckBox"
// import { validationError } from "../Form/validation"
type ControlledCheckboxProps = {
  control: any
  name: string
  label?: string
  handleChange?: (params1: any, params2?: string) => void
  watch?: any
  options: any[]
} & MultiSelectCheckboxProps &
  ControlledTextFieldProps

const ControlledMultiSelect: FC<ControlledCheckboxProps> = ({
  control,
  name,
  label,
  handleChange,
  watch = undefined,
  options,
  errors,
  ...props
}) => {
  const { field } = useController({ control, name })
  const [selectedAll, setSelectedAll] = useState(false)
  return (
    <>
      <MultiSelectMenu
        {...props}
        label={label ?? ""}
        options={options}
        savedValue={
          watch
            ? watch(field.name)?.filter((el: string) => el !== "select_all")
            : field.value
        }
        onChange={(e: any) => {
          if (e.includes("select_all") && e.length > options.length - 1) {
            field.onChange([])
            handleChange?.(e, name)
          } else if (e.length == options.length - 1 && selectedAll) {
            field.onChange([])
            setSelectedAll(false)
            handleChange?.([], name)
          } else if (e.includes("select_all")) {
            const filter = options?.filter((el) => {
              return el.value !== "select_all"
            })
            const map = filter.map((el) => el.value)
            field.onChange(map)
            setSelectedAll(true)
            handleChange?.(e, name)
          } else {
            field.onChange(e.filter((el: string) => el !== "select_all"))
            handleChange?.(e, name)
          }
        }}
      />
      {/* {errors && errors[field.name] && (
        <Heading left="0" color="brands.red.80" fontSize="12px" marginTop="2">
          {translate(`validation.${validationError(errors[field.name])}`)}
        </Heading>
      )} */}
    </>
  )
}

export default ControlledMultiSelect
