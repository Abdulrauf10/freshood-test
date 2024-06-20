// PersonalInfoDrawer.tsx
import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import CustomTitle from "../Text"
import { IoIosArrowBack } from "react-icons/io"
import DetailTextElement from "../Text/DetailTextElement"
import { useDrawer } from "@/context/drawerContext"
import { useForm } from "react-hook-form"
import ControlledReactSelect from "../formHook/ControlledReactSelect"
import ControlledField from "../formHook/ControlledField"
import { FieldType } from "@/types/form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useEditPersonalInfo from "./hooks/useEditPersonalInfo"
import useGetMe from "@/hooks/useGetMe"

const EditPersonalInfo: React.FC<any> = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const { dataMe } = useGetMe()

  const {
    control,
    formState: { errors },
    onSubmit,
    handleSubmit,
    setValue,
    watch
  } = useEditPersonalInfo()

  const options = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." }
  ]

  return (
    <>
      <HStack
        gap={{
          base: 0,
          md: 8
        }}
      >
        <HStack
          cursor={"pointer"}
          gap={2}
          onClick={() => setActiveDrawer("personalInfo")}
        >
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width={"80%"} justifyContent={"center"}>
          <CustomTitle title="Personal Info" />
        </HStack>
      </HStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems={"start"} pt={8} gap={6}>
          <VStack alignItems={"start"} width={"100%"}>
            <ControlledReactSelect
              name="title"
              control={control}
              options={options}
              errors={errors}
              nameData="title"
              label="Title"
              handleChange={(val) => {
                setValue("title", val?.value || "")
              }}
              value={
                watch("title")
                  ? options.find((option) => option.value === watch("title"))
                  : null
              }
            />
          </VStack>
          <VStack alignItems={"start"} width={"100%"}>
            <ControlledField
              name="first_name"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              label="First Name"
              borderRadius={"3xl"}
            />
          </VStack>
          <VStack alignItems={"start"} width={"100%"}>
            <ControlledField
              name="last_name"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              label="Last Name"
              borderRadius={"3xl"}
            />
          </VStack>
          <Button
            color={"white"}
            backgroundColor={"#016748"}
            padding={"16px"}
            borderRadius={"3xl"}
            marginTop={"20px"}
            type="submit"
            width={"100%"}
          >
            Save
          </Button>
        </VStack>
      </form>
    </>
  )
}

export default EditPersonalInfo
