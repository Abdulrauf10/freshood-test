/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react"
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop
} from "react-image-crop"
import setCanvasPreview from "./setCanvasPreview"
import { Button, Flex } from "@chakra-ui/react"

const ASPECT_RATIO = 1
const MIN_DIMENSION = 150

const ImageCropper = ({
  closeModal,
  updateAvatar,
  imgSrc,
  imgsSrc,
  setImgsSrc
}: any) => {
  const imgRef = useRef(null) as any
  const previewCanvasRef = useRef(null) as any
  const [crop, setCrop] = useState() as any

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <ReactCrop
          crop={crop}
          onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
        >
          <img
            ref={imgRef}
            src={imgSrc}
            alt="Upload"
            style={{ maxHeight: "70vh" }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
        <Button
          onClick={() => {
            setCanvasPreview(
              imgRef.current, // HTMLImageElement
              previewCanvasRef.current, // HTMLCanvasElement
              convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
              )
            )
            const dataUrl = previewCanvasRef.current.toDataURL()
            const temp = [...imgsSrc]
            for (let i = 0; i < temp.length; i++) {
              if (temp[i] === imgSrc) {
                temp[i] = dataUrl
              }
            }
            setImgsSrc(temp)

            updateAvatar(dataUrl)
            closeModal()
          }}
        >
          Crop Image
        </Button>
      </Flex>

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150
          }}
        />
      )}
    </>
  )
}
export default ImageCropper
