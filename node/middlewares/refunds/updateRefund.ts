import { refundsService } from '../../services/refundsService'

export async function updateRefund(ctx: Context, next: () => Promise<string>) {
  const id = ctx.query.id as string

  try {
    const response = await refundsService(ctx).updateRefunds(id)

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
