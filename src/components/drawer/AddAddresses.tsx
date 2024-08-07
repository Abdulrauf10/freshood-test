// PersonalInfoDrawer.tsx
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react"
import React from "react"
import CustomTitle from "../Text"
import { IoIosArrowBack } from "react-icons/io"
import DetailTextElement from "../Text/DetailTextElement"
import { useDrawer } from "@/context/drawerContext"
import { Controller, useForm } from "react-hook-form"
import ControlledReactSelect from "../formHook/ControlledReactSelect"
import ControlledField from "../formHook/ControlledField"
import { FieldType } from "@/types/form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useAddAddress from "./hooks/useAddAddress"
import PhoneInput from "react-phone-input-2"
import { useDataEdit } from "@/store/useDataEdit"
import ControlledSwitch from "../formHook/ControlledSwitch"
import useCountries from "@/hooks/useCountries"

const AddAddresses: React.FC<any> = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const { isEdit, payload, setIsEdit, setPayload } = useDataEdit()
  const { dataCountries } = useCountries()

  const {
    control,
    formState: { errors },
    handleSubmit,
    onSubmit,
    mutation,
    mutationUpdate,
    setValue,
    watch
  } = useAddAddress(isEdit, payload)

  const countryOptions =
    dataCountries?.data?.map((data) => ({
      label: data.name,
      value: data.id
    })) || []

  const handlePhoneChange = (value: any, country: any) => {
    const countryCode = country.dialCode
    const phoneNumber = value
      .replace(new RegExp(`^\\+?${country.dialCode}`), "")
      .replace(/[^0-9]/g, "")

    const numGroup = countryCode + phoneNumber
    setValue("contact_number", numGroup)
  }

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
          onClick={() => {
            setIsEdit(false)
            setPayload(null)
            setActiveDrawer("addressList")
          }}
        >
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width={"80%"} justifyContent={"center"}>
          <CustomTitle title="Add New Address" />
        </HStack>
      </HStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems={"start"} pt={8} gap={6}>
          <VStack alignItems={"start"} width={"100%"}>
            <HStack width="100%">
              <Box
                as="span"
                color={"#1B1917"}
                fontWeight={"600"}
                whiteSpace="nowrap"
              >
                CONTACT
              </Box>
              <Divider mt={2} width={"100%"} />
            </HStack>

            <Text fontSize={"14px"} fontWeight={500}>
              Contact name
            </Text>
            <ControlledField
              name="contact_name"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="Contact name"
            />
            <Text fontSize={"14px"} fontWeight={500}>
              Contact number
            </Text>
            <Controller
              name="contact_number"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
                  country={"ph"}
                  onlyCountries={["ph"]}
                  enableSearch={false}
                  value={field.value}
                  onChange={(value, country) =>
                    handlePhoneChange(value, country)
                  }
                  inputStyle={{
                    color: "#808080",
                    fontWeight: "400",
                    height: "35px",
                    borderRadius: "16px",
                    width: "100%"
                  }}
                />
              )}
            />

            <Text fontSize={"14px"} fontWeight={500}>
              Email
            </Text>
            <ControlledField
              name="email"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="Email"
            />

            <HStack width="100%" mt={"20px"}>
              <Box
                as="span"
                color={"#1B1917"}
                fontWeight={"600"}
                whiteSpace="nowrap"
              >
                ADDRESS
              </Box>
              <Divider mt={2} width={"100%"} />
            </HStack>

            <Text fontSize={"14px"} fontWeight={500}>
              Country
            </Text>
            {/* <ControlledField
              name="country"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
            /> */}

            <ControlledReactSelect
              name="country"
              nameData="country"
              control={control}
              errors={errors}
              options={countryOptions}
              handleChange={(val) => {
                setValue("country", val.value)
              }}
              value={countryOptions?.find(
                (val: any) => val.value == payload?.country
              )}
              placeholder={"Select country"}
            />

            <Text fontSize={"14px"} fontWeight={500}>
              Province / state
            </Text>
            <ControlledField
              name="province_state"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="Province / state"
            />

            <Text fontSize={"14px"} fontWeight={500}>
              City
            </Text>
            <ControlledField
              name="city"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="City"
            />

            <Text fontSize={"14px"} fontWeight={500}>
              Address Line 1
            </Text>
            <ControlledField
              name="address_line_1"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="Address Line 1"
            />

            <Text fontSize={"14px"} fontWeight={500}>
              Address Line 2 (Optional)
            </Text>
            <ControlledField
              name="address_line_2"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="Unit, Building, Floor"
            />

            <Text fontSize={"14px"} fontWeight={500}>
              Postal Code
            </Text>
            <ControlledField
              name="postal_code"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              placeholder="Postal code"
            />

            <HStack justifyContent={"space-between"} width={"100%"}>
              <Text>Set as default</Text>
              <ControlledSwitch
                name="is_default"
                control={control}
                errors={errors}
                handleChange={(val) => {
                  setValue("is_default", val)
                }}
                isChecked={payload?.is_default}
              />
            </HStack>
          </VStack>

          <Button
            color={"white"}
            backgroundColor={"#016748"}
            padding={"16px"}
            borderRadius={"3xl"}
            marginTop={"20px"}
            type="submit"
            width={"100%"}
            isLoading={mutation?.isLoading || mutationUpdate?.isLoading}
          >
            Save
          </Button>
        </VStack>
      </form>
    </>
  )
}

export default AddAddresses
