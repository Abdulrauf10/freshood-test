import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Box } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import React, { ReactNode, useEffect } from "react";
import { useDrawer } from "@/context/drawerContext";

interface GlobalDrawerProps {
  children: ReactNode;
  activeDrawer: string;
}

const GlobalDrawer: React.FC<GlobalDrawerProps> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setActiveDrawer } = useDrawer(); 

  useEffect(() => {
    if (!isOpen) {
      setActiveDrawer("setting");
    }
  }, [!isOpen]);

  return (
    <>
      <Box onClick={onOpen} backgroundColor={"transparent"} cursor={"pointer"}>
        <IoIosSettings size="24px" color="white" />
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xl"}>
        <DrawerOverlay>
          <DrawerContent>
                <DrawerCloseButton />
            <DrawerBody pt={10}>
              {children}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default GlobalDrawer;