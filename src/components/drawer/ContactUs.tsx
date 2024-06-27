// PersonalInfoDrawer.tsx
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  useMediaQuery
} from "@chakra-ui/react"
import React from "react"
import CustomTitle from "../Text"
import { IoIosArrowBack } from "react-icons/io"
import { FieldType } from "@/types/form"
import ControlledField from "../formHook/ControlledField"
import useContactUs from "@/hooks/useContactUs"
import ControlledReactSelect from "../formHook/ControlledReactSelect"

interface PersonalInfoProps {
  onBackClick: () => void
}

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" }
]

const ContactUs: React.FC<PersonalInfoProps> = ({ onBackClick }) => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    mutation,
    setValue,
    watch
  } = useContactUs()

  return (
    <>
      <HStack
        gap={{
          base: 0,
          md: 8
        }}
      >
        <HStack cursor={"pointer"} gap={2} onClick={onBackClick}>
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width={"80%"} justifyContent={"center"}>
          <CustomTitle title="Contact Us" />
        </HStack>
      </HStack>
      <VStack alignItems={"start"} pt={8} gap={6}>
        <Text
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#323A43"
          }}
        >
          Share your suggestions, or make feature requests. Your feedback is
          valuable to us !
        </Text>
        <Flex
          as="form"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
          flexDirection="column"
          gap={4}
        >
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500",
                color: "#44403C"
              }}
            >
              Subject
            </Text>
            <ControlledField
              placeholder="Subject"
              name="subject"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <ControlledReactSelect
              name="category"
              control={control}
              options={options}
              errors={errors}
              nameData="category"
              label="Category"
              handleChange={(val) => {
                setValue("category", val?.value || "")
              }}
              value={
                watch("category")
                  ? options.find((option) => option.value === watch("category"))
                  : null
              }
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500",
                color: "#44403C"
              }}
            >
              Description
            </Text>
            <ControlledField
              placeholder="Enter your message"
              name="description"
              control={control}
              errors={errors}
              fieldType={FieldType.textarea}
              borderRadius={"16px"}
              backgroundColor={"white"}
            />
          </Box>
        </Flex>
      </VStack>
    </>
  )
}

export default ContactUs
