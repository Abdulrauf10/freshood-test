"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import Specification from "@/features/merchant/product/Specification"

const SpecificationPage = () => {
  const searchParams = useSearchParams()

  return (
    <>
      <Specification searchParams={searchParams} />
    </>
  )
}

export default SpecificationPage
