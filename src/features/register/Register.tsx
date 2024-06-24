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
import Stepper from "@/components/stepper/Stepper"
import { useRouter } from "next/navigation"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"
import { Controller } from "react-hook-form"
import useCountries from "@/hooks/useCountries"
import { registerService } from "@/services/api/auth"
import useSidebarStore from "@/store/sidebarStore"

const Register = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const router = useRouter()
  const { dataCountries } = useCountries()
  const { isExpanded } = useSidebarStore()

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    watch,
    setValue,
    mutation
  } = useRegister()

  const cityOptions = dataCountries?.data?.flatMap((data) =>
    data.cities.map((sub) => ({
      label: sub.name,
      value: sub.id
    }))
  )

  const genderOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Ms.", value: "Ms." }
  ]

  const countryOptions =
    dataCountries?.data?.map((data) => ({
      label: data.name,
      value: data.id
    })) || []

  const steps = [
    { title: "Account registration" },
    { title: "About your bussines" },
    { title: "Verification" }
  ]

  const handlePhoneChange = (value: any, country: any) => {
    const countryCode = country.dialCode
    const phoneNumber = value
      .replace(new RegExp(`^\\+?${country.dialCode}`), "")
      .replace(/[^0-9]/g, "")
    setValue("country_code", countryCode)
    setValue("phone_number", phoneNumber)
  }

  const fontStyle = {
    color: "#44403C",
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "7px"
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingTop={"30px"}
      as="form"
      method="POST"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <HStack position={"relative"} width={"100%"} justifyContent={"center"}>
        {!isMobile && (
          <HStack
            position="absolute"
            left="0"
            onClick={() => router.back()}
            cursor="pointer"
            marginLeft={"200px"}
          >
            <MdOutlineKeyboardArrowLeft />
            <Text>Back</Text>
          </HStack>
        )}

        <CustomTitle title={"MERCHANT SIGN UP"} />
      </HStack>

      <HStack
        justifyContent={"center"}
        marginTop={"50px"}
        marginBottom={"50px"}
      >
        <Text color={"#78716C"}>Already a member?</Text>
        <Link href={"/login"}>
          <Text color={"#016748"}>Log in</Text>
        </Link>
      </HStack>

      <Stepper steps={steps} initialStep={0} width={isMobile ? "90%" : "60%"} />

      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        minWidth={isMobile ? "300px" : "440px"}
        mt={15}
        padding={4}
        backgroundColor={"white"}
      >
        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>Title</Text>
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

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>First name</Text>
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

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>Last name</Text>
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

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>Email</Text>
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

        <Box
          width={isMobile ? "300px" : "440px"}
          display={"flex"}
          justifyContent={"flex-start"}
        >
          <Text {...fontStyle}>Phone number</Text>
        </Box>

        <HStack width={isMobile ? "300px" : "440px"}>
          <Controller
            name="country_code"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInput
                country={"ph"}
                onlyCountries={["ph"]}
                enableSearch={false}
                value={field.value}
                onChange={(value, country) => handlePhoneChange(value, country)}
                inputStyle={{
                  color: "#808080",
                  fontWeight: "400",
                  width: `${isMobile ? "300px" : "440px"}`,
                  height: "35px",
                  borderRadius: "16px"
                }}
              />
            )}
          />
        </HStack>
        {errors.phone_number && (
          <Text color="red.500">{errors.phone_number?.message}</Text>
        )}

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>Country</Text>
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
              (val: any) => val.value == watch("country_id")
            )}
          />
        </Box>
        {errors.phone_number && (
          <Text color="red.500">{errors.country_id?.message}</Text>
        )}

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>City</Text>
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
        {errors.phone_number && (
          <Text color="red.500">{errors.city_id?.message}</Text>
        )}

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>Password</Text>
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

        <Flex alignItems={"center"} width={isMobile ? "300px" : "440px"}>
          <ControlledCheckbox
            name="prefers_marketing_updates"
            control={control}
            watch={watch}
          />

          <Text ml={2} {...fontStyle}>
            To ensure you receive important product and marketing updates from
            Freshood&apos;s email, You can opt out anytime.
          </Text>
        </Flex>
      </VStack>

      <Box
        width={"100%"}
        borderTop={"solid 1px #E5E1D8"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button
          marginBottom={isMobile ? "90px" : "10px"}
          color={"white"}
          backgroundColor={"#016748"}
          fontSize={"16px"}
          fontWeight={500}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          width={isExpanded ? "65%" : "80%"}
          isLoading={mutation.isLoading}
          isDisabled={!watch("prefers_marketing_updates")}
          onClick={() =>
            onSubmit({
              user_type: "Seller",
              title: watch("title"),
              first_name: watch("first_name"),
              last_name: watch("last_name"),
              email: watch("email"),
              password: watch("password"),
              country_code: watch("country_code"),
              phone_number: watch("phone_number"),
              country_id: watch("country_id"),
              city_id: watch("city_id"),
              prefers_marketing_updates: watch("prefers_marketing_updates")
            })
          }
        >
          Get started
        </Button>
      </Box>
    </Box>
  )
}

export default Register
