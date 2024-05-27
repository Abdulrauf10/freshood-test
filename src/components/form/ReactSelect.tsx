import { Box, Heading } from "@chakra-ui/react"
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
            color: "white"
          },
          ".base-select__control": {
            borderColor: error ? "#F96161" : "#5B91AC"
          }
        }}
      >
        <ReactSelect
          {...rest}
          classNamePrefix="base-select"
          styles={{
            multiValue: (provided, state) => ({
              ...provided,
              backgroundColor: "#0070B5",
              color: "white"
            }),
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
          <Heading color="brands.red.80" fontSize="12px" marginTop="2">
            {validationError(error)}
          </Heading>
        )}
      </Box>
    )
  }
)

Select.displayName = "BaseSelect"

export default Select
