import { getAllProducts } from '@/actions/ptoducts'
import ProductsTable from '@/components/Module/Dashboard/Admin/Product/ProductTable'
import React from 'react'

const ProductTablePage = async () => {

  const {data:products}=await getAllProducts()

  return (
    <div>
        <ProductsTable products={products} />
    </div>
  )
}

export default ProductTablePage