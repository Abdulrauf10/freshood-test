// PersonalInfoDrawer.tsx
import { Flex, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import CustomTitle from "../Text"
import { IoIosArrowBack } from "react-icons/io"
import DetailTextElement from "../Text/DetailTextElement"
import { useDrawer } from "@/context/drawerContext"
import useGetMe from "@/hooks/useGetMe"
import useCountries from "@/hooks/useCountries"

interface PersonalInfoProps {
  onBackClick: () => void
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ onBackClick }) => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const { dataMe } = useGetMe()
  const { dataCountries } = useCountries()

  const countryOptions =
    dataCountries?.data?.map((data) => ({
      label: data.name,
      value: data.id
    })) || []

  const cityOptions = dataCountries?.data?.flatMap((data) =>
    data.cities.map((sub) => ({
      label: sub.name,
      value: sub.id
    }))
  )

  const country =
    countryOptions?.find((data) => data?.value === dataMe?.data?.country)
      ?.label || " - "

  const city =
    cityOptions?.find((data) => data?.value === dataMe?.data?.city)?.label ||
    " - "
  return (
    <>
      <HStack
        gap={{
          base: 0,
          md: 8
        }}
      >
        <HStack cursor={"pointer"} gap={2} onClick={onBackClick}>
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width={"80%"} justifyContent={"center"}>
          <CustomTitle title="Personal Info" />
        </HStack>
      </HStack>
      <VStack alignItems={"start"} pt={8} gap={6}>
        <DetailTextElement
          onClick={() => setActiveDrawer("editPersonalInfo")}
          topText="Personal Name"
          bottomText={`${dataMe?.data?.first_name} ${
            dataMe?.data?.last_name || "-"
          }`}
        />
        <DetailTextElement topText="Country" bottomText={country} />
        <DetailTextElement topText="City" bottomText={city} />
        <DetailTextElement
          topText="Phone Number"
          bottomText={dataMe?.data?.phone_number || "-"}
        />
        <DetailTextElement
          topText="Email Address"
          bottomText={dataMe?.data?.email || "-"}
        />
        <Text fontSize="12px" color="#78716C">
          The information is used for delivery and customer inquiry purposes.
          Your details will not be shared publicly.
        </Text>
      </VStack>
    </>
  )
}

export default PersonalInfo
