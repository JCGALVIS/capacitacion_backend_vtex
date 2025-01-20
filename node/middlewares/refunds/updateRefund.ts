import { json } from "co-body"
import { RefundsStatus } from "../../enums/refundsStatus"

export async function updateRefund(ctx: Context, next: () => Promise<any>) {
  const { req, clients: { refunds }, vtex: { route: { params } } } = ctx

  const { id } = params as { id: string }
  const body = await json(req) as { refund_status: RefundsStatus }

  try {
    const response = await refunds.update(id, body)

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
