import { RefundsStatus } from "../../enums/refundsStatus"
import { refundsService } from "../../services/refundsService"

export async function getRefunds(
  ctx: Context,
  next: () => Promise<void>
) {
    const { vtex: { route: { params } } } = ctx

  const { refundsStatus } = params as { refundsStatus: RefundsStatus }
  try {
    let response

    if (!refundsStatus) {
        response = await refundsService(ctx).list()
    } else {
        response = await refundsService(ctx).getByRefundsStatus(refundsStatus)
    }

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
