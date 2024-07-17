import React from "react"
import MyAccount from "@/features/my-account/MyAccount"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freshood - My Account"
}

const MerchantProduct = () => {
  return (
    <>
      <MyAccount />
    </>
  )
}

export default MerchantProduct
