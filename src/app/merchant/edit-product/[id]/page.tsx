import React from "react"
import EditProduct from "@/features/merchant/product/EditProduct"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freshood - Edit Product"
}

const EditProductPage = ({ params }: any) => {
  return (
    <>
      <EditProduct productId={params.id} />
    </>
  )
}

export default EditProductPage
