import { VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { IoArrowForward, IoChevronForward } from "react-icons/io5";

interface DetailTextElementProps {
  topText: string;
  bottomText: string;
  onClick?: () => void;
}

const DetailTextElement: React.FC<DetailTextElementProps> = ({ topText, bottomText, onClick }) => {
  return (
    <HStack justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
      <VStack alignItems={"start"} width={"100%"} onClick={onClick} cursor={onClick ? 'pointer' : 'default'}>
        <Text fontSize="12px" color="#78716C">{topText}</Text>
        <Text color="#44403C">{bottomText}</Text>
      </VStack>
      {
        onClick && <IoChevronForward size="20px" color="#44403C" />
      }
      
    </HStack>
  );
};

export default DetailTextElement;