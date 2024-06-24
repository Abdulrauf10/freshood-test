"use client"

import React from "react"

import EditProduct from "@/features/merchant/product/EditProduct"

const EditProductPage = ({ params }: any) => {
  return (
    <>
      <EditProduct productId={params.id} />
    </>
  )
}

export default EditProductPage
