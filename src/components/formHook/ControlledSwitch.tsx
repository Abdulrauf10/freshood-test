import { FC } from "react"
import { useController } from "react-hook-form"
import { FormControl, FormLabel, Switch, Skeleton } from "@chakra-ui/react"

type ControlledSwitchProps = {
  control: any
  name: string
  label?: string
  errors?: any
  isRequiredField?: boolean
  isLoading?: boolean
  defaultValue?: boolean | any
  handleChange?: (val: boolean) => void
  isChecked?: boolean
}

const ControlledSwitch: FC<ControlledSwitchProps> = ({
  control,
  errors,
  name,
  label,
  isRequiredField = false,
  isLoading = false,
  defaultValue = false,
  isChecked,
  handleChange,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue })

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

        <Switch
          id={field.name}
          // isChecked={field.value || field.defaultValue}
          isChecked={isChecked || field.value}
          onChange={(e) => {
            field.onChange(e.target.checked)
            handleChange?.(e.target.checked)
          }}
          {...props}
          colorScheme="teal"
        />
      </FormControl>
    </Skeleton>
  )
}

export default ControlledSwitch
