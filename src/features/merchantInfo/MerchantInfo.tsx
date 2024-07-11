"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
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
import useSidebarStore from "@/store/sidebarStore"

const MerchantInfo = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [link, setLink] = useState(null)
  const router = useRouter()
  const { isExpanded } = useSidebarStore()
  const [value1, setValue1] = useState([])
  const [value2, setValue2] = useState([])
  const [value3, setValue3] = useState([])
  const [value4, setValue4] = useState([])
  const [value5, setValue5] = useState([])
  const [value6, setValue6] = useState([])

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    watch,
    setValue,
    mutation
  } = useMerchantInfo()

  const { dataCategories } = useProductCategories()

  const productCountOptions = [
    { label: "1-10", value: "1_10" },
    { label: "11-25", value: "11_25" },
    { label: "26-50", value: "26_50" },
    { label: "51-100", value: "51_100" },
    { label: "More than 100", value: "100_up" }
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

  const subCategoryOptions1 =
    dataCategories?.data[0]?.sub_categories?.map((sub) => ({
      label: sub.name,
      value: sub.id
    })) || []

  const subCategoryOptions2 =
    dataCategories?.data[1]?.sub_categories?.map((sub) => ({
      label: sub.name,
      value: sub.id
    })) || []

  const subCategoryOptions3 =
    dataCategories?.data[2]?.sub_categories?.map((sub) => ({
      label: sub.name,
      value: sub.id
    })) || []

  const subCategoryOptions4 =
    dataCategories?.data[3]?.sub_categories?.map((sub) => ({
      label: sub.name,
      value: sub.id
    })) || []

  const subCategoryOptions5 =
    dataCategories?.data[4]?.sub_categories?.map((sub) => ({
      label: sub.name,
      value: sub.id
    })) || []

  const subCategoryOptions6 =
    dataCategories?.data[5]?.sub_categories?.map((sub) => ({
      label: sub.name,
      value: sub.id
    })) || []

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

  const fontStyle = {
    color: "#44403C",
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "7px"
  }

  const updateValueId = useCallback(() => {
    setValue("sub_category_ids", [
      ...value1,
      ...value2,
      ...value3,
      ...value4,
      ...value5,
      ...value6
    ])
  }, [setValue, value1, value2, value3, value4, value5, value6])

  useEffect(() => {
    updateValueId()
  }, [value1, value2, value3, value4, value5, value6, updateValueId])

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <HStack
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
        marginBottom={"50px"}
        mt={"30px"}
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
          <Text {...fontStyle}>Store Name</Text>
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
          <Text {...fontStyle}>Website URL</Text>
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
          <Text {...fontStyle}>Products Count Range</Text>
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
          <Text {...fontStyle}>Primary Category</Text>

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
                        isDisabled={
                          watch("primary_category_ids")?.length === 3 &&
                          !(field.value || []).includes(option.value)
                        }
                      >
                        {option.label}
                      </Checkbox>
                    )}
                  />
                ))}
              </VStack>
            )}
            select={
              watch("primary_category_ids")?.length === 3
                ? "All selected"
                : `${
                    watch("primary_category_ids")?.length
                      ? watch("primary_category_ids")?.length
                      : 0
                  } selected`
            }
          />
        </Box>

        <VStack>
          {watch("primary_category_ids")?.includes(1) && (
            <Box width={isMobile ? "300px" : "440px"}>
              <Text {...fontStyle}>Sub Category GranCrops and Cereals</Text>

              <CheckboxSelect
                renderPopoverContent={() => (
                  <VStack alignItems={"flex-start"}>
                    {subCategoryOptions1.map((option: any) => (
                      <Controller
                        key={option.value}
                        name="sub_category_ids1"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={(field.value || []).includes(
                              option.value
                            )}
                            onChange={() => {
                              const newValue: any = (
                                field.value || []
                              ).includes(option.value)
                                ? (field.value || []).filter(
                                    (val) => val !== option.value
                                  )
                                : [...(field.value || []), option.value]

                              setValue1(newValue)

                              updateValueId()
                              setValue("sub_category_ids1", newValue)
                            }}
                            // isDisabled={
                            //   watch("sub_category_ids")?.length === 3 &&
                            //   !(field.value || []).includes(option.value)
                            // }
                          >
                            {option.label}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </VStack>
                )}
                select={
                  value1?.length === subCategoryOptions1?.length
                    ? "All selected"
                    : `${value1?.length ? value1?.length : 0} selected`
                }
              />
            </Box>
          )}

          {watch("primary_category_ids")?.includes(2) && (
            <Box width={isMobile ? "300px" : "440px"}>
              <Text {...fontStyle}>
                Sub Category Leafy and Steam Vegetables{" "}
              </Text>

              <CheckboxSelect
                renderPopoverContent={() => (
                  <VStack alignItems={"flex-start"}>
                    {subCategoryOptions2.map((option: any) => (
                      <Controller
                        key={option.value}
                        name="sub_category_ids2"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={(field.value || []).includes(
                              option.value
                            )}
                            onChange={() => {
                              const newValue: any = (
                                field.value || []
                              ).includes(option.value)
                                ? (field.value || []).filter(
                                    (val) => val !== option.value
                                  )
                                : [...(field.value || []), option.value]

                              setValue2(newValue)
                              updateValueId()

                              setValue("sub_category_ids2", newValue)
                            }}
                            // isDisabled={
                            //   watch("sub_category_ids")?.length === 3 &&
                            //   !(field.value || []).includes(option.value)
                            // }
                          >
                            {option.label}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </VStack>
                )}
                select={
                  value2?.length === subCategoryOptions2?.length
                    ? "All selected"
                    : `${value2?.length ? value2?.length : 0} selected`
                }
              />
            </Box>
          )}

          {watch("primary_category_ids")?.includes(3) && (
            <Box width={isMobile ? "300px" : "440px"}>
              <Text {...fontStyle}>Sub Category Fruit Bearing Vegetables</Text>

              <CheckboxSelect
                renderPopoverContent={() => (
                  <VStack alignItems={"flex-start"}>
                    {subCategoryOptions3.map((option: any) => (
                      <Controller
                        key={option.value}
                        name="sub_category_ids3"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={(field.value || []).includes(
                              option.value
                            )}
                            onChange={() => {
                              const newValue: any = (
                                field.value || []
                              ).includes(option.value)
                                ? (field.value || []).filter(
                                    (val) => val !== option.value
                                  )
                                : [...(field.value || []), option.value]
                              setValue3(newValue)

                              updateValueId()
                              setValue("sub_category_ids3", newValue)
                            }}
                            // isDisabled={
                            //   watch("sub_category_ids")?.length === 3 &&
                            //   !(field.value || []).includes(option.value)
                            // }
                          >
                            {option.label}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </VStack>
                )}
                select={
                  value3?.length === subCategoryOptions3?.length
                    ? "All selected"
                    : `${value3?.length ? value3?.length : 0} selected`
                }
              />
            </Box>
          )}

          {watch("primary_category_ids")?.includes(4) && (
            <Box width={isMobile ? "300px" : "440px"}>
              <Text {...fontStyle}>
                Sub Category Root, bulb or tuberous Vegetables
              </Text>

              <CheckboxSelect
                renderPopoverContent={() => (
                  <VStack alignItems={"flex-start"}>
                    {subCategoryOptions4.map((option: any) => (
                      <Controller
                        key={option.value}
                        name="sub_category_ids4"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={(field.value || []).includes(
                              option.value
                            )}
                            onChange={() => {
                              const newValue: any = (
                                field.value || []
                              ).includes(option.value)
                                ? (field.value || []).filter(
                                    (val) => val !== option.value
                                  )
                                : [...(field.value || []), option.value]
                              setValue4(newValue)
                              updateValueId()

                              setValue("sub_category_ids4", newValue)
                            }}
                            // isDisabled={
                            //   watch("sub_category_ids")?.length === 3 &&
                            //   !(field.value || []).includes(option.value)
                            // }
                          >
                            {option.label}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </VStack>
                )}
                select={
                  value4?.length === subCategoryOptions4?.length
                    ? "All selected"
                    : `${value4?.length ? value4?.length : 0} selected`
                }
              />
            </Box>
          )}

          {watch("primary_category_ids")?.includes(5) && (
            <Box width={isMobile ? "300px" : "440px"}>
              <Text {...fontStyle}>
                Sub Category Tropical and Subtropical Fruits
              </Text>

              <CheckboxSelect
                renderPopoverContent={() => (
                  <VStack alignItems={"flex-start"}>
                    {subCategoryOptions5.map((option: any) => (
                      <Controller
                        key={option.value}
                        name="sub_category_ids5"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={(field.value || []).includes(
                              option.value
                            )}
                            onChange={() => {
                              const newValue: any = (
                                field.value || []
                              ).includes(option.value)
                                ? (field.value || []).filter(
                                    (val) => val !== option.value
                                  )
                                : [...(field.value || []), option.value]
                              setValue5(newValue)
                              updateValueId()

                              setValue("sub_category_ids5", newValue)
                            }}
                            // isDisabled={
                            //   watch("sub_category_ids")?.length === 3 &&
                            //   !(field.value || []).includes(option.value)
                            // }
                          >
                            {option.label}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </VStack>
                )}
                select={
                  value5?.length === subCategoryOptions5?.length
                    ? "All selected"
                    : `${value5?.length ? value5?.length : 0} selected`
                }
              />
            </Box>
          )}

          {watch("primary_category_ids")?.includes(6) && (
            <Box width={isMobile ? "300px" : "440px"}>
              <Text {...fontStyle}>Sub Category Citrus Fruits</Text>

              <CheckboxSelect
                renderPopoverContent={() => (
                  <VStack alignItems={"flex-start"}>
                    {subCategoryOptions6.map((option: any) => (
                      <Controller
                        key={option.value}
                        name="sub_category_ids6"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={(field.value || []).includes(
                              option.value
                            )}
                            onChange={() => {
                              const newValue: any = (
                                field.value || []
                              ).includes(option.value)
                                ? (field.value || []).filter(
                                    (val) => val !== option.value
                                  )
                                : [...(field.value || []), option.value]
                              setValue6(newValue)
                              updateValueId()

                              setValue("sub_category_ids6", newValue)
                            }}
                            // isDisabled={
                            //   watch("sub_category_ids")?.length === 3 &&
                            //   !(field.value || []).includes(option.value)
                            // }
                          >
                            {option.label}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </VStack>
                )}
                select={
                  value6?.length === subCategoryOptions6?.length
                    ? "All selected"
                    : `${value6?.length ? value6?.length : 0} selected`
                }
              />
            </Box>
          )}
        </VStack>

        <Box width={isMobile ? "300px" : "440px"}>
          <Text {...fontStyle}>How did you hear about us?</Text>
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
          <Text {...fontStyle}>About Your Business</Text>
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

      <Box
        width={"100%"}
        borderTop={"solid 1px #E5E1D8"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button
          mb={isMobile ? "90px" : "10px"}
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          isLoading={mutation?.isLoading}
          width={isExpanded ? "65%" : "80%"}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default MerchantInfo
