import { Box, Text } from "@chakra-ui/react"
import { FC, forwardRef } from "react"
import ReactSelect, { GroupBase } from "react-select"
import { AsyncProps } from "react-select/async"
import { FieldError } from "@/types/form"
import { validationError } from "./validation"

export type SelectProps<
  Option = unknown,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
> = AsyncProps<Option, IsMulti, Group> & {
  error?: FieldError | undefined
  nameData: string
}

const Select: FC<SelectProps> = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const { error, nameData = "name", ...rest } = props

    return (
      <Box
        sx={{
          width: "100%",
          ".base-select__menu": {
            fontSize: "12px"
          },
          ".base-select__multi-value__label": {
            color: "white",
            backgroundColor: "#016748"
          },
          ".base-select__control": {
            borderColor: error ? "#F96161" : "#E5E1D8"
          }
        }}
      >
        <ReactSelect
          {...rest}
          classNamePrefix="base-select"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "16px", // Apply border-radius here
              borderColor: error ? "#F96161" : "#5B91AC"
            }),
            // styles={{
            //   multiValue: (provided, state) => ({
            //     ...provided,
            //     backgroundColor: "#0070B5",
            //     color: "white",
            //     borderRadius: "16px"
            //   }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
              minWidth: "100%",
              width: "max-content"
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 })
          }}
          menuPortalTarget={
            typeof window !== "undefined" ? document.body : null
          }
        />
        {error && (
          <Text color="brands.red.80" fontSize="12px" marginTop="2">
            {validationError(error)}
          </Text>
        )}
      </Box>
    )
  }
)

Select.displayName = "BaseSelect"

export default Select
