import React, { useEffect, useState } from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuButtonProps,
  Icon
} from "@chakra-ui/react"

export type MultiSelectCheckboxProps = {
  label: string
  options: any[]
  id: string
  onChange?: (selectedValues: string[]) => void
  buttonProps?: MenuButtonProps
  savedValue?: string[]
  isRadius?: boolean
}

const MultiSelectCheckbox = (props: MultiSelectCheckboxProps): JSX.Element => {
  const { label, options, buttonProps, savedValue, isRadius = true } = props
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const handleOnchange = (values: any) => {
    values = values.filter((_: string[]) => _.length)
    setSelectedOptions(values)
    props.onChange?.(values)
  }

  useEffect(() => {
    if (savedValue) {
      setSelectedOptions(
        savedValue.filter((el) => {
          return el !== "select_all"
        })
      )
    }
  }, [savedValue])

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            type="button"
            backgroundColor={selectedOptions.length ? "white.500" : "white"}
            color={selectedOptions.length ? "black.80" : "gray.600"}
            borderColor={selectedOptions.length ? "black.80" : "gray.300"}
            borderWidth={1}
            width="200px"
            borderRadius={isRadius ? "90px" : "4px"}
            px="auto"
            py={2}
            fontSize="14px"
            _focus={{
              outline: "none"
            }}
            value={selectedOptions.filter((data) => {
              return data !== "select_all"
            })}
            {...buttonProps}
          >
            {`${
              selectedOptions.filter((data) => {
                return data !== "select_all"
              }).length > 0
                ? ` (${
                    selectedOptions.filter((data) => {
                      return data !== "select_all"
                    }).length
                  }) Selected`
                : `${label}`
            }`}{" "}
            {/* <Icon as={ChevronDownIcon} fontSize={20} marginLeft={85} /> */}
          </MenuButton>
          <MenuList sx={{ overflowX: "auto", maxHeight: "200px" }}>
            <MenuOptionGroup
              title={undefined}
              // defaultValue={savedValue ? savedValue : selectedOptions}
              type="checkbox"
              onChange={handleOnchange}
              value={selectedOptions.filter((data) => {
                return data !== "select_all"
              })}
            >
              {options.map((option: any) => {
                return (
                  <MenuItemOption
                    key={`multiselect-menu-${option.value}`}
                    type="checkbox"
                    value={option.value}
                  >
                    {option.label}
                  </MenuItemOption>
                )
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

MultiSelectCheckbox.displayName = "MultiSelectCheckbox"

export default MultiSelectCheckbox
