import { json } from "co-body"
import { Refunds } from "vtex.service-example"
import { refundsService } from "../../services/refundsService"

export async function saveRefund(ctx: Context, next: () => Promise<any>) {
  const { req } = ctx

  const body = (await json(req)) as Refunds

  try {
    const response = await refundsService(ctx).save(body)

    ctx.status = 201
    ctx.body = response
  } catch (error) {
    console.error(JSON.stringify(error.response.data))

    ctx.status = 400
    ctx.body = { message: error.message }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}
