import React from "react"
import Specification from "@/features/merchant/product/Specification"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freshood - Specification"
}

const SpecificationPage = () => {
  return (
    <>
      <Specification />
    </>
  )
}

export default SpecificationPage
