"use client"

import React from "react"
import ProductDetail from "@/features/merchant/product/ProductDetail"

const ProductDetailPage = ({ params }: any) => {
  return (
    <>
      <ProductDetail productId={params.productId} />
    </>
  )
}

export default ProductDetailPage
