import React from "react"
import CreateProduct from "@/features/merchant/product/CreateProduct"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freshood - Create Product"
}

const CreateProductPage = () => {
  return (
    <>
      <CreateProduct />
    </>
  )
}

export default CreateProductPage
