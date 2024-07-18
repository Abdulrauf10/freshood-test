import React from "react"
import PaymentAndReturnPolicy from "@/features/merchant/product/PaymentAndReturnPolicy"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freshood - Payment and Return Policy"
}

const SpecificationPage = () => {
  return (
    <>
      <PaymentAndReturnPolicy />
    </>
  )
}

export default SpecificationPage
