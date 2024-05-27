/* eslint-disable react/display-name */
import { FC, forwardRef } from "react"
import { Heading, Input, InputProps } from "@chakra-ui/react"
import { FieldError } from "@/types/form"
import { validationError } from "./validation"

export type InputTextProps = InputProps & {
  error?: FieldError | undefined
}

const InputText: FC<InputTextProps> = forwardRef<
  HTMLInputElement,
  InputTextProps
>((props, ref) => {
  const { error, ...rest } = props

  return (
    <>
      <Input
        border={1}
        borderColor={error ? "brands.red.80" : "#E5E1D8"}
        borderStyle="solid"
        borderRadius="4px"
        p={2}
        minW={rest?.minW ? rest?.minW : "200px"}
        height="auto"
        fontSize="12px"
        _placeholder={{ color: "brands.black.20" }}
        {...rest}
      />
      {error && (
        <Heading color="brands.red.80" fontSize="12px" marginTop="2">
          {validationError(error)}
        </Heading>
      )}
    </>
  )
})

export default InputText
