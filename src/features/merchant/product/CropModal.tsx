/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react"
import "react-image-crop/dist/ReactCrop.css"
import ImageCropper from "./ImageCropper"

const CropModal = ({
  openEdit,
  handleClose,
  imgSrc,
  updateAvatar,
  imgsSrc,
  setImgsSrc
}: any) => {
  return (
    <Modal isOpen={openEdit} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ImageCropper
            imgSrc={imgSrc}
            updateAvatar={updateAvatar}
            closeModal={handleClose}
            imgsSrc={imgsSrc}
            setImgsSrc={setImgsSrc}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CropModal
