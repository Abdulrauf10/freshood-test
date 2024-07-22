"use client"

import React, { useEffect, useRef, useState } from "react"
import { Box, Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react"
import Image from "next/image"
import { FaChevronDown } from "react-icons/fa"
import { CiCamera } from "react-icons/ci"
import "react-image-crop/dist/ReactCrop.css"
import useImageList from "@/hooks/useImageList"
import { Image as ImageType } from "@/types/product"
// import CropModal from "./CropModal"

const SelectedImage = ({ largeImage }: { largeImage: string }) => {
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
  setValue,
  handleSubmit,
  onSubmit
}: {
  isMobile: Boolean
  imgsSrc: any
  setImgsSrc: any
  selectedImages: ImageType[]
  setSelectedImages: (temp: ImageType[]) => void
  setValue: any
  handleSubmit: any
  onSubmit: any
}) => {
  const [orderBy, setOrderBy] = useState("asc")
  const { isLoading: isLoadingImage, data: dataImage } = useImageList(orderBy)

  const onRecentClick = () => {
    setOrderBy(orderBy === "desc" ? "asc" : "desc")
  }

  const onChange = async (e: any) => {
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

    handleSubmit(onSubmit({ folder: "product", file: e.target.files[0] }))
  }

  const [largeImage, setLargeImage] = useState("")
  const inputImage = useRef(null) as any

  const onUploadClick = () => {
    inputImage.current.click()
  }

  const handleSelectImage = (image: ImageType) => {
    const temp = [...selectedImages]
    let index = temp.findIndex((data) => data.url === image.url)
    if (selectedImages.length < 10) {
      if (index === -1) {
        temp.push(image)
      } else {
        temp.splice(index, 1)
      }
    } else {
      if (index === -1) {
        temp.shift()
        temp.push(image)
      } else {
        index = temp.findIndex((data) => data.url === image.url)
        temp.splice(index, 1)
      }
    }
    setSelectedImages(temp)
    setValue("files", temp)
  }

  const checkImageOrder = (id: number) => {
    const temp = [...selectedImages]
    const index = temp.findIndex((data) => data.id === id)
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
            <SelectedImage largeImage={largeImage} />
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
            onClick={onRecentClick}
          >
            Recents
          </Text>
          <FaChevronDown />
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={isLoadingImage ? 1 : 0}>
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
          {!isLoadingImage
            ? dataImage?.map((image: ImageType, index: number) => (
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
                          checkImageOrder(image?.id) === null
                            ? "transparent"
                            : "#016748",
                        boxShadow: "1px 1px 1px rgba(0, 0, 0, .3)"
                      }}
                      onClick={() => handleSelectImage(image)}
                    >
                      {checkImageOrder(image?.id)}
                    </Flex>
                    <Image
                      alt={image?.url}
                      src={image?.url}
                      fill={true}
                      sizes="50"
                      priority={false}
                      style={{
                        objectFit: "cover",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setOpenEdit(false)
                        setLargeImage(image?.url)
                      }}
                    />
                  </Box>
                </GridItem>
              ))
            : new Array(6).fill(1).map((_item, index) => {
                return (
                  <GridItem key={index}>
                    <Skeleton>
                      <Box
                        sx={{
                          height: "170px",
                          width: "100%",
                          position: "relative"
                        }}
                      />
                    </Skeleton>
                  </GridItem>
                )
              })}
        </Grid>
      </Box>
      <input
        onChange={onChange}
        type="file"
        name="file"
        ref={inputImage}
        style={{ display: "none" }}
        accept="image/*"
      />
    </Flex>
  )
}

export default UploadImageStep
