"use client"

import { Box, Button, HStack, Text, VStack, useMediaQuery } from "@chakra-ui/react"
import { IoIosArrowBack } from "react-icons/io"
import CustomTitle from "../Text"
import { useDrawer } from "@/context/drawerContext"
import exp from "constants"
import { FieldType } from "@/types/form"
import ControlledField from "../formHook/ControlledField"
import { Controller, useForm } from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"

const EditStoreInformation: React.FC = () => {
    const {
        activeDrawer,
        setActiveDrawer,
        selectedEditStoreInfo,
        setSelectedEditStoreInfo
    } = useDrawer()


    const [isMobile] = useMediaQuery(`(max-width: 768px)`)

    const form = useForm()

    const { control, handleSubmit, formState: { errors }, setValue } = form

    const fieldToEdit: any = {
        "storeName": {
            label: "Store Name",
            name: "storeName",
            value: "Example Shop",
            placeholder: "Enter Store Name",
            type: FieldType.textfield,
        },
        "establishedSince": {
            label: "Established Since",
            name: "establishedSince",
            value: "2018",
            placeholder: "Enter Established Since",
            type: FieldType.textfield,
        },
        "physicalStores": {
            label: "Physical Stores",
            name: "physicalStores",
            value: "1",
            placeholder: "Enter Physical Stores",
            type: FieldType.textfield,
        },
        "annualSales": {
            label: "Annual Sales",
            name: "annualSales",
            value: "100000",
            placeholder: "Enter Annual Sales",
            type: FieldType.textfield,
        },
        "website": {
            label: "Website",
            name: "website",
            value: "www.example.com",
            placeholder: "Enter Website",
            type: FieldType.textfield,
        },
        "phoneNumber": {
            label: "Phone Number",
            name: "phoneNumber",
            value: "12345678",
            placeholder: "Enter Phone Number",
            type: "phoneNumber",
        },
        "jobTitle": {
            label: "Job Title",
            name: "jobTitle",
            value: "Owner",
            placeholder: "Enter Job Title",
            type: FieldType.textfield,
        },
        "websiteSocial": {
            label: "Website",
            name: "websiteSocial",
            value: "www.example.com",
            placeholder: "Enter Website",
            type: FieldType.textfield,
        },
        "instagram": {
            label: "Instagram",
            name: "instagram",
            value: "www.instagram.com",
            placeholder: "Enter Instagram",
            type: FieldType.textfield,
        },
        "facebook": {
            label: "Facebook",
            name: "facebook",
            value: "www.facebook.com",
            placeholder: "Enter Facebook",
            type: FieldType.textfield,
        },
        "wechat": {
            label: "Wechat",
            name: "wechat",
            value: "www.wechat.com",
            placeholder: "Enter Wechat",
            type: FieldType.textfield,
        },
        "storeCategory": {
            label: "How would you categorise your store?",
            name: "storeCategory",
            value: "Fashion",
            placeholder: "Enter Store Category",
            type: FieldType.textfield,
        },
        "bestSellers": {
            label: "What types of products are your best-sellers?",
            name: "bestSellers",
            value: "Shoes",
            placeholder: "Enter Best Sellers",
            type: FieldType.textfield,
        },
    }

    const handlePhoneChange = (value: any, country: any) => {
        const countryCode = "+" + country.dialCode
        const phoneNumber = value
            .replace(new RegExp(`^\\+?${country.dialCode}`), "")
            .replace(/[^0-9]/g, "")
        setValue("country_code", countryCode)
        setValue("phone_number", phoneNumber)
    }

    const renderField = (field: any) => {
        if (field.type === "phoneNumber") {
            return (
                <>
                    <Box
                        width={isMobile ? "300px" : "440px"}
                        display={"flex"}
                        justifyContent={"flex-start"}
                    >
                        <Text>Phone Number</Text>
                    </Box>

                    <HStack width={isMobile ? "300px" : "440px"}>
                        <Controller
                            name="country_code"
                            control={control}
                            defaultValue="1"
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                                <PhoneInput
                                    country={"us"}
                                    enableSearch={true}
                                    value={field.value}
                                    onChange={(value, country) => handlePhoneChange(value, country)}
                                    inputStyle={{
                                        color: "#808080",
                                        fontWeight: "400",
                                        width: `100%`,
                                        height: "35px",
                                        borderRadius: "16px"
                                    }}
                                />
                            )}
                        />
                    </HStack>
                </>
            )
        }
        return (
            <ControlledField
                name={field.name} control={control} errors={errors}
                fieldType={field.type} label={field.label} borderRadius={"3xl"}
                placeholder={field.placeholder} defaultValue={field.value}
            />
        )
    }

    return (
        <>
            <HStack gap={{ base: 0, md: 8 }} mb={4}>
                <HStack cursor="pointer" gap={2} onClick={() => {
                    setActiveDrawer('storeInfo')
                    setSelectedEditStoreInfo('')
                }}>
                    <IoIosArrowBack size="24px" color="black" />
                    <Text>Back</Text>
                </HStack>
                <HStack width="80%" justifyContent="center">
                    <CustomTitle title="Edit Store Information" />
                </HStack>

            </HStack>
            <VStack gap={4} alignItems={"flex-start"}>
                {
                    renderField(fieldToEdit[selectedEditStoreInfo])
                }
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
        </>
    )
}

export default EditStoreInformation