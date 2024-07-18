"use client"
import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import CustomTitle from "../Text"
import { IoIosArrowBack } from "react-icons/io"
import { useDrawer } from "@/context/drawerContext"
import ControlledField from "../formHook/ControlledField"
import { FieldType } from "@/types/form"
import Link from "next/link"
import useChangePassword from "./hooks/useChangePassword"

const ChangePassword: React.FC<any> = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()

  const {
    control,
    formState: { errors },
    onSubmit,
    handleSubmit,
    setValue,
    watch,
    mutation
  } = useChangePassword()

  console.log("err :", mutation)

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
          onClick={() => setActiveDrawer("setting")}
        >
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width={"80%"} justifyContent={"center"}>
          <CustomTitle title="reset password" />
        </HStack>
      </HStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems={"end"} pt={8} gap={6}>
          <VStack alignItems={"start"} width={"100%"}>
            <ControlledField
              name="current_password"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              label="Current password"
              borderRadius={"3xl"}
            />
            {mutation?.error?.response?.data?.message && (
              <Text color="red.500" fontSize={"12px"}>
                {mutation?.error?.response?.data?.message}
              </Text>
            )}
          </VStack>
          <Link href={"/forgot-password"}>
            <Text
              color={"#016748"}
              fontSize={"14px"}
              fontWeight={500}
              mt={"-10px"}
              textAlign={"right"}
            >
              Forgot Password?
            </Text>
          </Link>
          <VStack alignItems={"start"} width={"100%"}>
            <ControlledField
              name="new_password"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              label="New password"
              borderRadius={"3xl"}
            />
            {errors.new_password && (
              <Text color="red.500" fontSize={"12px"}>
                {errors.new_password?.type}
              </Text>
            )}
            <Text
              fontSize={"11px"}
              fontWeight={500}
              color={"#A8A29D"}
              mt={"-5px"}
            >
              Password must be at least 8 characters.
            </Text>
          </VStack>

          <Button
            color={"white"}
            backgroundColor={"#016748"}
            padding={"16px"}
            borderRadius={"3xl"}
            marginTop={"20px"}
            type="submit"
            width={"100%"}
            isLoading={mutation?.isLoading}
          >
            Change password
          </Button>
        </VStack>
      </form>
    </>
  )
}

export default ChangePassword
