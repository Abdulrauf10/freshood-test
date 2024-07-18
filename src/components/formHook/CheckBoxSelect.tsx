import React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  Stack,
  PopoverBody,
  Button
} from "@chakra-ui/react"

type CheckboxSelectProps = {
  renderPopoverContent: () => React.ReactNode
  select: string
}

const CheckboxSelect: React.FC<CheckboxSelectProps> = ({
  renderPopoverContent,
  select
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          width="100%"
          border={"solid 1px #E5E1D8"}
          borderRadius={"16px"}
          backgroundColor={"white"}
          _hover={{ backgroundColor: "none" }}
          color={"#D5D3D1"}
          fontWeight={"400"}
          display={"flex"}
          justifyContent={"flex-start"}
          fontSize={"14px"}
        >
          {select}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={"100%"} maxHeight={"300px"} overflowY={"scroll"}>
        {/* <PopoverHeader fontWeight="bold" border="0">
          Select all
        </PopoverHeader> */}
        <PopoverBody>
          <Stack spacing={2}>{renderPopoverContent()}</Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default CheckboxSelect
