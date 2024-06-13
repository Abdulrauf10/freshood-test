"use client"

import React, { useRef, useState } from "react"
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import Image from "next/image"
import { FaChevronDown } from "react-icons/fa"
import { CiCamera } from "react-icons/ci"
import "react-image-crop/dist/ReactCrop.css"
import CropModal from "./CropModal"

const SelectedImage = ({
  largeImage,
  isMobile
}: {
  largeImage: string
  isMobile: Boolean
}) => {
  return (
    <Image
      alt={largeImage}
      src={largeImage}
      fill={true}
      style={{
        objectFit: "contain",
        borderRadius: "24px"
      }}
    />
  )
}

const UploadImageStep = ({
  isMobile,
  imgsSrc,
  setImgsSrc,
  selectedImages,
  setSelectedImages,
  setValue
}: {
  isMobile: Boolean
  imgsSrc: any
  setImgsSrc: any
  selectedImages: string[]
  setSelectedImages: (temp: string[]) => void
  setValue: any
}) => {
  const onChange = (e: any) => {
    let uniqueArr: string[] = []
    let defaultValue = ""
    if (!e.target.files.length) return
    if (!defaultValue) {
      defaultValue = URL.createObjectURL(e.target.files[0])
    }

    for (let i = 0; i < e.target.files.length; i++) {
      uniqueArr.push(URL.createObjectURL(e.target.files[i]))
    }
    setImgsSrc([...imgsSrc, ...uniqueArr])
    if (!largeImage) {
      setLargeImage(defaultValue)
    }
  }

  const [largeImage, setLargeImage] = useState("")
  const inputImage = useRef(null) as any

  const onUploadClick = () => {
    inputImage.current.click()
  }

  const handleSelectImage = (link: string) => {
    if (selectedImages.length <= 10) {
      const temp: string[] = [...selectedImages]
      const index = temp.indexOf(link)
      if (index === -1) {
        temp.push(link)
        setSelectedImages(temp)
      } else {
        temp.splice(index, 1)
        setSelectedImages(temp)
      }
    }
  }

  const checkImageOrder = (link: string) => {
    const temp = [...selectedImages]
    const index = temp.indexOf(link)
    if (index === -1) {
      return null
    } else {
      return index + 1
    }
  }
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <Flex
      flexDirection={isMobile ? "column" : "row"}
      justifyContent={isMobile ? "center" : "space-between"}
      gap={isMobile ? 4 : 12}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        sx={{
          width: isMobile ? "100%" : "45%"
        }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          sx={{
            height: isMobile ? "335px" : "456px",
            width: isMobile ? "335px" : "456px",
            marginBottom: "32px",
            position: "relative"
          }}
        >
          {largeImage ? (
            <SelectedImage largeImage={largeImage} isMobile={isMobile} />
          ) : (
            <Box
              sx={{
                height: isMobile ? "335px" : "456px",
                width: isMobile ? "335px" : "456px",
                backgroundColor: "#F5F5F4",
                borderRadius: "24px"
              }}
            />
          )}
        </Flex>
        {/* {largeImage && (
          <Flex justifyContent="center">
            <Button onClick={() => setOpenEdit(true)}>Edit</Button>
          </Flex>
        )} */}
        {/* <CropModal
          openEdit={openEdit}
          handleClose={() => setOpenEdit(false)}
          imgSrc={largeImage}
          updateAvatar={setLargeImage}
          setImgsSrc={setImgsSrc}
          imgsSrc={imgsSrc}
        /> */}
      </Flex>
      <Box
        sx={{
          width: isMobile ? "100%" : "55%"
        }}
      >
        <Flex
          gap={2}
          alignItems="center"
          sx={{ padding: "14px", cursor: "pointer" }}
        >
          <Text
            sx={{
              fontSize: "19px",
              fontWeight: "500"
            }}
          >
            Recents
          </Text>
          <FaChevronDown />
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem sx={{ height: "170px", width: "auto" }}>
            <Flex
              onClick={onUploadClick}
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer", height: "170px", width: "auto" }}
              flexDirection="column"
            >
              <CiCamera fontSize="48px" />
              <Text>New Photo</Text>
            </Flex>
          </GridItem>
          {imgsSrc.map((link: string, index: number) => (
            <GridItem key={index}>
              <Box
                sx={{
                  height: "170px",
                  width: "100%",
                  position: "relative"
                }}
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    fontSize: "14px",
                    color: "#fff",
                    position: "absolute",
                    right: "16px",
                    top: "16px",
                    border: "1.36px solid #fff",
                    height: "27.5px",
                    width: "27.5px",
                    borderRadius: "100%",
                    zIndex: "9999",
                    cursor: "pointer",
                    backgroundColor:
                      checkImageOrder(link) === null
                        ? "transparent"
                        : "#016748",
                    boxShadow: "1px 1px 1px rgba(0, 0, 0, .3)"
                  }}
                  onClick={() => handleSelectImage(link)}
                >
                  {checkImageOrder(link)}
                </Flex>
                <Image
                  alt={link}
                  src={link}
                  fill={true}
                  style={{
                    objectFit: "contain"
                  }}
                  onClick={() => {
                    setOpenEdit(false)
                    setLargeImage(link)
                  }}
                />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <input
        onChange={onChange}
        type="file"
        name="file"
        multiple
        ref={inputImage}
        style={{ display: "none" }}
        accept="image/*"
      />
    </Flex>
  )
}

export default UploadImageStep
