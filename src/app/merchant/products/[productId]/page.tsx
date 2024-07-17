import React from "react"
import ProductDetail from "@/features/merchant/product/ProductDetail"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freshood - Products"
}

const ProductDetailPage = ({ params }: any) => {
  return (
    <>
      <ProductDetail productId={params.productId} />
    </>
  )
}

export default ProductDetailPage
