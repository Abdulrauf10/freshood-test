import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
  Heading
} from "@chakra-ui/react"

import { FieldError } from "@/types/form"
import { validationError } from "./validation"

export type NumberTextProps = {
  error?: FieldError | undefined
  isStepper?: boolean
  minW?: string
} & NumberInputProps

const NumberText = ({
  error,
  isStepper = true,
  minW = "200px",
  ...props
}: NumberTextProps) => {
  return (
    <NumberInput {...props}>
      <NumberInputField
        value={props?.value === null ? "" : props?.value}
        border={1}
        borderColor={
          error ? "brands.red.80" : "var(--chakra-colors-chakra-border-color)"
        }
        borderStyle="solid"
        borderRadius="2xl"
        p={2}
        minW={minW ? minW : "200px"}
        height="auto"
        fontSize="16px"
        _placeholder={{ color: "brands.black.20" }}
      />
      {isStepper ? (
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      ) : null}
      {error && (
        <Heading color="brands.red.80" fontSize="12px" marginTop="2">
          {validationError(error)}
        </Heading>
      )}
    </NumberInput>
  )
}

export default NumberText
