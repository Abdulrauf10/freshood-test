"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
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
import useMerchantInfo from "./hook/useMerchantInfo"
import useSessionStore from "@/store/useSessionStore"
import Link from "next/link"
import ControlledCheckbox from "@/components/formHook/ControlledCheckBox"
import Stepper from "@/components/stepper/Stepper"
import { useRouter } from "next/navigation"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import ControlledReactSelectBox from "@/components/formHook/CheckBoxSelect"
import { Controller } from "react-hook-form"
import CheckboxSelect from "@/components/formHook/CheckBoxSelect"
import ControlledMultiSelect from "@/components/formHook/ControlledMultiSelect"
import useProductCategories from "@/hooks/useProductCategories"

const MerchantInfo = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [link, setLink] = useState(null)
  const router = useRouter()

  const [stateEmploymentStatus, setStateEmploymentStatus] = useState({
    checkedOptions: [],
    checkedAll: false,
    isOpen: false,
    searchKey: ""
  })

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    watch,
    setValue
  } = useMerchantInfo()

  const { dataCategories } = useProductCategories()

  const productCountOptions = [
    { label: "1-10", value: "1_10" },
    { label: "11-50", value: "11_50" },
    { label: "51-100", value: "51_100" },
    { label: "101-500", value: "101_500" }
  ]

  const primaryOptions =
    dataCategories?.data?.map((data: any) => ({
      label: data.name,
      value: data.id
    })) || []

  const subCategoryOptions =
    dataCategories?.data?.flatMap((data: any) =>
      data.sub_categories.map((sub: any) => ({
        label: sub.name,
        value: sub.id
      }))
    ) || []

  const heardFromOptions = [
    { label: "Social Media", value: "social_media" },
    { label: "Another brand", value: "another_brand" },
    { label: "A retainer", value: "retainer" },
    { label: "Freshood employee", value: "freshood_employee" },
    { label: "Other", value: "other" }
  ]

  const steps = [
    { title: "Account registration" },
    { title: "About your business" },
    { title: "Verification" }
  ]

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      paddingTop={"50px"}
    >
      <HStack
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
        marginBottom={"50px"}
      >
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

        <CustomTitle title={"MERCHANT INFO"} />
      </HStack>

      <Stepper steps={steps} initialStep={1} width={isMobile ? "90%" : "60%"} />

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
          <Text>Store Name</Text>
          <ControlledField
            name="store_name"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="Store Name"
          />
        </Box>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text>Website URL</Text>
          <ControlledField
            name="website_url"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="https://yourwebsite.com"
          />
        </Box>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text>Products Count Range</Text>
          <ControlledReactSelect
            name="products_count_range"
            nameData="products_count_range"
            control={control}
            errors={errors}
            options={productCountOptions}
            placeholder="Select range"
            handleChange={(val) => {
              setValue("products_count_range", val.value)
            }}
            value={productCountOptions?.find(
              (val) => val.value == watch("products_count_range")
            )}
          />
        </Box>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text>Primary Category</Text>

          <CheckboxSelect
            renderPopoverContent={() => (
              <VStack alignItems={"flex-start"}>
                {primaryOptions.map((option: any) => (
                  <Controller
                    key={option.value}
                    name="primary_category_ids"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        isChecked={(field.value || []).includes(option.value)}
                        onChange={() => {
                          const newValue = (field.value || []).includes(
                            option.value
                          )
                            ? (field.value || []).filter(
                                (val) => val !== option.value
                              )
                            : [...(field.value || []), option.value]
                          setValue("primary_category_ids", newValue)
                        }}
                      >
                        {option.label}
                      </Checkbox>
                    )}
                  />
                ))}
              </VStack>
            )}
            select={
              watch("primary_category_ids")?.length ===
              subCategoryOptions?.length
                ? "All selected"
                : `${
                    watch("primary_category_ids")?.length
                      ? watch("primary_category_ids")?.length
                      : 0
                  } selected`
            }
          />
        </Box>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text>Sub Category</Text>

          <CheckboxSelect
            renderPopoverContent={() => (
              <VStack alignItems={"flex-start"}>
                {subCategoryOptions.map((option: any) => (
                  <Controller
                    key={option.value}
                    name="sub_category_ids"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        isChecked={(field.value || []).includes(option.value)}
                        onChange={() => {
                          const newValue = (field.value || []).includes(
                            option.value
                          )
                            ? (field.value || []).filter(
                                (val) => val !== option.value
                              )
                            : [...(field.value || []), option.value]
                          setValue("sub_category_ids", newValue)
                        }}
                      >
                        {option.label}
                      </Checkbox>
                    )}
                  />
                ))}
              </VStack>
            )}
            select={
              watch("sub_category_ids")?.length === subCategoryOptions?.length
                ? "All selected"
                : `${
                    watch("sub_category_ids")?.length
                      ? watch("sub_category_ids")?.length
                      : 0
                  } selected`
            }
          />
        </Box>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text>How did you hear about us?</Text>
          <VStack alignItems={"flex-start"}>
            {heardFromOptions.map((option) => (
              <Controller
                key={option.value}
                name="heard_from"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    isChecked={(field.value || []).includes(option.value)}
                    onChange={() => {
                      const newValue = (field.value || []).includes(
                        option.value
                      )
                        ? (field.value || []).filter(
                            (val) => val !== option.value
                          )
                        : [...(field.value || []), option.value]
                      setValue("heard_from", newValue)
                    }}
                  >
                    {option.label}
                  </Checkbox>
                )}
              />
            ))}
          </VStack>
        </Box>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text>About Your Business</Text>
          <ControlledField
            name="about_your_business"
            control={control}
            errors={errors}
            fieldType={FieldType.textarea}
            borderRadius={"16px"}
            backgroundColor={"white"}
            placeholder="Describe your business"
          />
        </Box>
      </VStack>

      {isMobile ? (
        <Button
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          width={"300px"}
          marginBottom={"90px"}
        >
          Submit
        </Button>
      ) : (
        <Box width={"100%"} borderTop={"solid 1px #E5E1D8"}>
          <Button
            color={"white"}
            backgroundColor={"#016748"}
            padding={"16px"}
            borderRadius={"16px"}
            marginTop={"20px"}
            type="submit"
            width={"80%"}
            marginLeft={"250px"}
            marginBottom={"10px"}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default MerchantInfo
