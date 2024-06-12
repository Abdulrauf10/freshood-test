import { FC } from "react"
import { useController } from "react-hook-form"
import {
  Box,
  HStack,
  Input,
  FormControl,
  Skeleton,
  Text,
  SimpleGrid,
  useMediaQuery
} from "@chakra-ui/react"

interface CodeVerificationInputProps {
  control: any
  name: string
  isLoading?: boolean
  errors?: any
}

const ControlledBoxesInput: FC<CodeVerificationInputProps> = ({
  control,
  name,
  isLoading = false,
  errors
}) => {
  const { field } = useController({ control, name })
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box width={isMobile ? "350px" : "440px"}>
        <FormControl isInvalid={!!errors?.[name]} mb={4}>
          {/* <FormLabel htmlFor={name} fontSize="sm">
            Verification Code
          </FormLabel> */}
          <SimpleGrid columns={6} spacing={2} mb={4}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                textAlign="center"
                fontSize="xl"
                width="100%"
                height="3rem"
                value={field.value?.[index] || ""}
                onChange={(e) => {
                  const value = e.target.value
                  const newValue = field.value ? [...field.value] : []
                  newValue[index] = value
                  field.onChange(newValue.join(""))
                  if (value && index < 5) {
                    const nextInput = document.getElementById(
                      `code-${index + 1}`
                    )
                    if (nextInput) nextInput.focus()
                  }
                }}
                borderRadius={"16px"}
                id={`code-${index}`}
              />
            ))}
          </SimpleGrid>
          {errors?.[name] && (
            <Text color="red.500" fontSize="sm">
              {errors[name].message}
            </Text>
          )}
        </FormControl>
      </Box>
    </Skeleton>
  )
}

export default ControlledBoxesInput
