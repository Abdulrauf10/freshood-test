// PersonalInfoDrawer.tsx
import {
    Flex,
    HStack, Text,
    VStack
} from "@chakra-ui/react";
import React from "react";
import CustomTitle from "../Text";
import { IoIosArrowBack } from "react-icons/io";
import DetailTextElement from "../Text/DetailTextElement";
import { useDrawer } from "@/context/drawerContext";

interface PersonalInfoProps {
    onBackClick: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
    onBackClick
}) => {
    const { activeDrawer, setActiveDrawer } = useDrawer();
    return (
        <>
            <HStack gap={{
                base: 0,
                md: 8
            }}>
                <HStack cursor={"pointer"} gap={2} onClick={onBackClick}>
                    <IoIosArrowBack size="24px" color="black" />
                    <Text>Back</Text>
                </HStack>
                <HStack width={"80%"} justifyContent={"center"}>
                    <CustomTitle title="Personal Info" />
                </HStack>

            </HStack>
            <VStack alignItems={"start"} pt={8} gap={6}>
                <DetailTextElement onClick={() => setActiveDrawer('editPersonalInfo')} topText="Personal Name" bottomText="Mr. Jacky Chan" />
                <DetailTextElement topText="Country" bottomText="Philippine" />
                <DetailTextElement topText="City" bottomText="Manila" />
                <DetailTextElement topText="Phone Number" bottomText="+63 02 4567 890" />
                <DetailTextElement topText="Email Address" bottomText="jackychan@example.co" />
                <Text fontSize="12px" color="#78716C">The information is used for delivery and customer inquiry purposes. Your details will not be shared publicly.</Text>
            </VStack>
        </>
    );
};

export default PersonalInfo;