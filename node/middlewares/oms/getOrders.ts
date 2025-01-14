import { omsService } from '../../services/omsService'

export async function getOrders(ctx: Context, next: () => Promise<any>) {
  try {
    const response = await omsService(ctx).getOrders()

    ctx.status = 200
    ctx.body = response
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: error.message }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}
