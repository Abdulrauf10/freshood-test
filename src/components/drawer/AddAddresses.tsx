// PersonalInfoDrawer.tsx
import {
    Box,
    Button,
    Divider,
    Flex,
    HStack, Text,
    VStack
} from "@chakra-ui/react";
import React from "react";
import CustomTitle from "../Text";
import { IoIosArrowBack } from "react-icons/io";
import DetailTextElement from "../Text/DetailTextElement";
import { useDrawer } from "@/context/drawerContext";
import { useForm } from "react-hook-form";
import ControlledReactSelect from "../formHook/ControlledReactSelect";
import ControlledField from "../formHook/ControlledField";
import { FieldType } from "@/types/form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


interface FormData {
    title: string;
    first_name: string;
    last_name: string;
}


const AddAddresses: React.FC<any> = () => {
    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
    });
    const { activeDrawer, setActiveDrawer } = useDrawer();
    const { handleSubmit, control, formState: { errors }, setValue, watch, getValues } = useForm<any>({
        resolver: yupResolver(schema),

    });
    console.log(getValues())
    const onSubmit = (data: FormData) => console.log(data);

    const options = [{ value: 'Mr.', label: 'Mr.' }, { value: 'Mrs.', label: 'Mrs.' }]

    const formList = [
        {
            sectionName: 'Contact',
            fields: [
                {
                    name: 'name',
                    label: 'Contact Name',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
                {
                    name: 'phone',
                    label: 'Contact Number',
                    fieldType: FieldType.number,
                    control: control,
                    errors: errors,
                },
                {
                    name: 'email',
                    label: 'Email',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
            ]
        }, {
            sectionName: 'Address',
            fields: [
                {
                    name: 'country',
                    label: 'Country',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
                {
                    name: 'city',
                    label: 'City',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
                {
                    name: 'state',
                    label: 'Province / State',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
                
                {
                    name: 'address1',
                    label: 'Address Line 1',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
                {
                    name: 'address2',
                    label: 'Address Line 2',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
                {
                    name: 'postal',
                    label: 'Postal Code',
                    fieldType: FieldType.textfield,
                    control: control,
                    errors: errors,
                },
            ]
        }
    ]

    return (
        <>
            <HStack gap={{
                base: 0,
                md: 8
            }}>
                <HStack cursor={"pointer"} gap={2} onClick={() => setActiveDrawer('addressList')}>
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
                        {
                            formList.map((section, index) => (
                                <VStack key={index} width={"100%"} alignItems={"start"} spacing={4}>
                                    <Box as="span" color={"#1B1917"} fontWeight={"600"} whiteSpace="nowrap">{section.sectionName}</Box>
                                    <Divider />
                                    {
                                        section.fields.map((field, index) => (
                                            <ControlledField borderRadius={'2xl'} key={index} {...field} />
                                        ))
                                    }
                                </VStack>
                            ))
                        }
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
    );
};

export default AddAddresses;