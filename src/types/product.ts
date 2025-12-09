export type Product = {
  productid: string
  sellerid: string
  title: string
  content: string
  price: number
  photo: string
  status: string
  publishtime: string
  category: string
}

/**
 * 创建商品请求体（前端请求）
 */
export type CreateProductRequest = {
  sellerid: string
  title: string
  content: string
  price: number
  photo?: string | null
  // status 由后端默认设置为 ON_SALE，前端可不传
  status?: string
  category: string
}

/**
 * 更新商品请求体（可更新字段）
 */
export type UpdateProductRequest = {
  price?: number
  status?: string
}
