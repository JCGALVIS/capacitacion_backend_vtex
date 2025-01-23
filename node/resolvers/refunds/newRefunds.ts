import { refundsService } from '../../services/refundsService'
import type { Refunds } from '../../typings/Refunds'

interface Args {
  refund: Refunds
}

export const newRefunds = async (_: any, { refund }: Args, ctx: Context) => {
  const result = await refundsService(ctx).save(refund)

  return result
}
