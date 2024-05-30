"use client"

import React from "react"
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react"
import ControlledField from "@/components/formHook/ControlledField"
import ControlledReactSelect from "@/components/formHook/ControlledReactSelect"
import { FieldType } from "@/types/form"
import CustomTitle from "@/components/Text"
import useRegister from "./hook/useRegister"
import useSessionStore from "@/store/useSessionStore"
import Link from "next/link"
import ControlledCheckbox from "@/components/formHook/ControlledCheckBox"

const Register = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { sessionId } = useSessionStore()

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    watch,
    setValue
  } = useRegister()

  const cityOptions = [
    {
      label: "Alaminos",
      value: "f4f25815-f39d-488e-a24b-fb81ac7baa32"
    },
    {
      label: "Angeles City",
      value: "3a008a3f-b03c-40d4-917f-e6b8b85e9605"
    },
    {
      label: "Antipolo",
      value: "59709ec2-a39e-442f-94ed-3adee16f2f90"
    }
  ]

  const genderOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Ms.", value: "Ms." }
  ]

  const codeOptions = [
    {
      label: "148",
      value: "148"
    },
    {
      label: "62",
      value: "62"
    }
  ]

  const countryOptions = [
    {
      label: "Philippine",
      value: "e68a9582-77d5-4dd4-b9c4-3e70fe5a0ee7"
    }
  ]

  const typeOptions = [
    {
      label: "Buyer",
      value: "Buyer"
    },
    {
      label: "Seller",
      value: "Seller"
    }
  ]

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      paddingTop={"200px"}
    >
      <CustomTitle title={"BUYER SIGN UP"} />
      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        width={isMobile ? "300px" : "500px"}
        mt={4}
        padding={4}
        backgroundColor={"white"}
      >
        <Box width={"100%"}>
          <Text>Title</Text>
          <ControlledReactSelect
            name="title"
            nameData="title"
            control={control}
            errors={errors}
            options={typeOptions}
            handleChange={(val) => {
              setValue("user_type", val.value)
            }}
            value={typeOptions?.find((val) => val.value == watch("user_type"))}
          />
        </Box>

        <Box width={"100%"}>
          <Text>Title</Text>
          <ControlledReactSelect
            name="title"
            nameData="title"
            control={control}
            errors={errors}
            options={genderOptions}
            placeholder="Select your title"
            handleChange={(val) => {
              setValue("title", val.value)
            }}
            value={genderOptions?.find((val) => val.value == watch("title"))}
          />
        </Box>

        <Box width={"100%"}>
          <Text>First name</Text>
          <ControlledField
            name="first_name"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="First name"
          />
        </Box>

        <Box width={"100%"}>
          <Text>Last name</Text>
          <ControlledField
            name="last_name"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="Last name"
          />
        </Box>

        <Box width={"100%"}>
          <Text>Email</Text>
          <ControlledField
            name="email"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="your@example.com"
          />
        </Box>

        <Box width={"100%"} display={"flex"} justifyContent={"flex-start"}>
          <Text>Phone number</Text>
        </Box>

        <HStack width={"100%"}>
          <Box width={"20%"}>
            <ControlledReactSelect
              name="country_code"
              nameData="country_code"
              control={control}
              errors={errors}
              options={codeOptions}
              handleChange={(val) => setValue("country_code", val.value)}
              value={codeOptions?.find(
                (val) => val.value == watch("country_code")
              )}
            />
          </Box>
          <Box width={"80%"}>
            <ControlledField
              name="phone_number"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
              placeholder="02 2323 232"
            />
          </Box>
        </HStack>

        <Box width={"100%"}>
          <Text>Country</Text>
          <ControlledReactSelect
            name="country_id"
            nameData="country_id"
            control={control}
            errors={errors}
            options={countryOptions}
            handleChange={(val) => {
              setValue("country_id", val.value)
            }}
            value={countryOptions?.find(
              (val) => val.value == watch("country_id")
            )}
          />
        </Box>

        <Box width={"100%"}>
          <Text>City</Text>
          <ControlledReactSelect
            name="city_id"
            nameData="city_id"
            control={control}
            errors={errors}
            options={cityOptions}
            placeholder="Select your city"
            handleChange={(val) => setValue("city_id", val.value)}
            value={cityOptions?.find((val) => val.value == watch("city_id"))}
          />
        </Box>

        <Box width={"100%"}>
          <Text>Password</Text>
          <ControlledField
            name="password"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="Password"
          />
        </Box>

        <Flex alignItems={"center"} width={"100%"}>
          <ControlledCheckbox
            name="prefers_marketing_updates"
            control={control}
            watch={watch}
          />

          <Text ml={2}>
            To ensure you receive important product and marketing updates from
            Freshood&apos;s email, You can opt out anytime.
          </Text>
        </Flex>

        <Button
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          isDisabled={!watch("prefers_marketing_updates")}
        >
          Get started
        </Button>
        <HStack justifyContent={"center"}>
          <Text color={"#78716C"}>Already a member?</Text>
          <Link href={"/login"}>
            <Text color={"#016748"}>Log in</Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Register
