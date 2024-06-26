"use client"

import React, { useState } from "react"
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

const ItemList = ({
  category,
  onClose,
  setSelectedSubCategory,
  setValue
}: any) => {
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
                setValue("sub_category_id", subcategory.id)
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
  isMobile,
  setValue
}: any) => {
  const { dataCategories, isLoadingCategories } = useProductCategories()

  const [filteredData, setFilteredData] = useState([]) as any
  const [isNotFound, setNotFound] = useState(false)

  const filterData = (data: any, keyword: string) => {
    keyword = keyword.toLowerCase()
    return data.reduce((acc: any, category: any) => {
      if (category.name.toLowerCase().includes(keyword)) {
        acc.push(category)
        return acc
      }

      const matchingSubCategories = category.sub_categories.filter((sub: any) =>
        sub.name.toLowerCase().includes(keyword)
      )
      if (matchingSubCategories.length > 0) {
        acc.push({
          ...category,
          sub_categories: matchingSubCategories
        })
      }

      return acc
    }, [])
  }

  const onHandleFilterChange = (text: string) => {
    const filterItem = filterData(dataCategories?.data, text)

    if (!filterItem?.length) {
      setNotFound(true)
      setFilteredData(dataCategories?.data)
    } else {
      setNotFound(false)
      setFilteredData(filterItem)
    }
  }

  const categoryToShow = filteredData.length
    ? filteredData
    : dataCategories?.data

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
            <Input
              type="text"
              placeholder="Search category"
              onChange={(e) => {
                onHandleFilterChange(e.currentTarget.value)
              }}
            />
          </InputGroup>
          {isNotFound && (
            <Text sx={{ margin: "4px 0 0 10px", color: "red" }}>
              Category Not Found
            </Text>
          )}
          {!isLoadingCategories && (
            <Box sx={{ marginTop: "1rem" }}>
              <Accordion>
                {categoryToShow.map((category: any) => {
                  return (
                    <ItemList
                      onClose={onClose}
                      key={category.id}
                      category={category}
                      setSelectedSubCategory={setSelectedSubCategory}
                      setValue={setValue}
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
