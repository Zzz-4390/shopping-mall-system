import request from '@/utils/request'
import type { CreateOrderRequest, OrderDetail, ApiResult } from '@/types'

const baseURL = '/orders'

// 创建订单：POST /orders/add/:buyerid
export const createOrder = (
  buyerid: string,
  body: CreateOrderRequest,
): Promise<ApiResult<OrderDetail>> => request.post(`${baseURL}/add/${buyerid}`, body)

// 完成订单：POST /orders/complete/:orderid
export const completeOrder = (orderid: string): Promise<ApiResult<OrderDetail>> =>
  request.post(`${baseURL}/complete/${orderid}`)

// 查询订单信息：GET /orders/get/:userid
export const getOrders = (userid: string): Promise<ApiResult<OrderDetail[]>> =>
  request.get(`${baseURL}/get/${userid}`)

export default { createOrder, completeOrder, getOrders }
