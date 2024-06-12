"use client"

import React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text
} from "@chakra-ui/react"
import { MdClose } from "react-icons/md"
import useProductCategories from "@/hooks/useProductCategories"
import { FaSearch } from "react-icons/fa"
import { IoIosArrowForward } from "react-icons/io"

const ItemList = ({ category, onClose, setSelectedSubCategory }: any) => {
  return (
    <AccordionItem sx={{ padding: " 14px 0" }}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {category.name}
          </Box>
          <IoIosArrowForward />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {category.sub_categories.map((subcategory: any) => {
          return (
            <Box
              sx={{
                cursor: "pointer",
                padding: "10px 16px",
                fontWeight: "400",
                fontSize: "16px",
                _hover: {
                  backgroundColor: "whitesmoke"
                }
              }}
              key={subcategory.id}
              onClick={() => {
                setSelectedSubCategory(subcategory)
                onClose()
              }}
            >
              {subcategory.name}
            </Box>
          )
        })}
      </AccordionPanel>
    </AccordionItem>
  )
}

const CategoryListDrawer = ({
  isOpen,
  onClose,
  setSelectedSubCategory,
  isMobile
}: any) => {
  const { dataCategories, isLoadingCategories } = useProductCategories()

  return (
    <Drawer
      isOpen={isOpen}
      placement={isMobile ? "bottom" : "right"}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent sx={{ minWidth: isMobile ? "auto" : "600px" }}>
        <DrawerHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Box sx={{ fontSize: "28px", cursor: "pointer" }} onClick={onClose}>
              <MdClose />
            </Box>
            <Text>Choose Category</Text>
            <Box sx={{ display: "hidden" }} />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch />
            </InputLeftElement>
            <Input type="text" placeholder="Search category" />
          </InputGroup>
          {!isLoadingCategories && (
            <Box sx={{ marginTop: "1rem" }}>
              <Accordion>
                {dataCategories?.data.map((category) => {
                  return (
                    <ItemList
                      onClose={onClose}
                      key={category.id}
                      category={category}
                      setSelectedSubCategory={setSelectedSubCategory}
                    />
                  )
                })}
              </Accordion>
            </Box>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CategoryListDrawer
