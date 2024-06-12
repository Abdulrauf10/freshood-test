/* eslint-disable react/display-name */
import { Textarea, Heading, TextareaProps } from "@chakra-ui/react"
import { FC, forwardRef } from "react"
import { FieldError } from "@/types/form"
import { validationError } from "./validation"

type InputTextProps = TextareaProps &
  any & {
    error: FieldError | undefined
    disabled?: boolean
  }

const BaseTextArea: FC<InputTextProps> = forwardRef<
  HTMLTextAreaElement,
  InputTextProps
>((props, ref) => {
  const { error, ...rest } = props

  return (
    <>
      <Textarea
        border={1}
        borderColor={error ? "brands.red.80" : "#E5E1D8"}
        borderStyle="solid"
        borderRadius="4px"
        p={2}
        minW="200px"
        height="auto"
        fontSize={rest?.fontSize || "12px"}
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

export default BaseTextArea
