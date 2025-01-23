import type { OrderDetailResponse } from '../../node_modules/@vtex/clients/build/typings/oms.d'
import { omsService } from '../../services/omsService'

export async function getOrders(
  ctx: Context,
  next: () => Promise<OrderDetailResponse>
) {
  const email = ctx.query.email as string
  const orderId = ctx.query.orderId as string

  try {
    let response

    if (email) response = await omsService(ctx).getOrders(email)
    if (orderId) response = await omsService(ctx).getOrdersById(orderId)

    ctx.status = 200
    ctx.body = response
  } catch (error) {
    console.error(error.response)

    ctx.status = 400
    ctx.body = { message: error.message }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}
