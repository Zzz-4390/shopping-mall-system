import request from '@/utils/request'
import type { AddCartItemRequest, CartItemDetail, ApiResult } from '@/types'

const baseURL = '/cart'

// 添加购物车项：POST /cart/add/:cartid
export const addCartItem = (
  cartid: string,
  body: AddCartItemRequest,
): Promise<ApiResult<CartItemDetail>> => request.post(`${baseURL}/add/${cartid}`, body)

// 删除购物车项：DELETE /cart/delete/:cartitemid
export const deleteCartItem = (cartitemid: string): Promise<ApiResult<string>> =>
  request.delete(`${baseURL}/delete/${cartitemid}`)

// 获取购物车项：GET /cart/get/:cartid
export const getCartItems = (cartid: string): Promise<ApiResult<CartItemDetail[]>> =>
  request.get(`${baseURL}/get/${cartid}`)

export default { addCartItem, deleteCartItem, getCartItems }
