"use client"

import React from "react"
import ProductDetail from "@/features/merchant/product/ProductDetail"
import useProductDetail from "@/hooks/useProductDetail"
import { Product } from "@/types/product"

const ProductDetailPage = ({ params }: any) => {
  const { data, isLoading } = useProductDetail(params.productId)

  return (
    <>
      <ProductDetail product={data?.data as Product} isLoading={isLoading} />
    </>
  )
}

export default ProductDetailPage
