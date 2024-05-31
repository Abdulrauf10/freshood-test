import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"
import { Checkbox, Box, Text, Stack, Button } from "@chakra-ui/react"

const MultiSelect = ({ name, label, options, control }: any) => {
  const [allSelected, setAllSelected] = useState(false)

  useEffect(() => {
    const allChecked = options.every((option: any) => option.isSelected)
    setAllSelected(allChecked)
  }, [options])

  const handleSelectAll = (field: any) => {
    if (allSelected) {
      field.onChange([])
    } else {
      field.onChange(options.map((option: any) => option.value))
    }
    setAllSelected(!allSelected)
  }

  const handleChange = (selectedOptions: any, field: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : []
    field.onChange(selectedValues)
    const allChecked = options.every((option: any) =>
      selectedValues.includes(option.value)
    )
    setAllSelected(allChecked)
  }

  return (
    <Box>
      <Text mb={2}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Button size="sm" mb={2} onClick={() => handleSelectAll(field)}>
              {allSelected ? "Clear All" : "Select All"}
            </Button>
            <Select
              {...field}
              isMulti
              options={options}
              value={options.filter((option: any) =>
                field.value.includes(option.value)
              )}
              onChange={(selectedOptions) =>
                handleChange(selectedOptions, field)
              }
            />
          </>
        )}
      />
    </Box>
  )
}
