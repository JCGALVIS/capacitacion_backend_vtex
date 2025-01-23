import { omsService } from '../../services/omsService'

interface Args {
  email: string
}

export const orders = async (_: any, { email }: Args, ctx: Context) => {
  const result = await omsService(ctx).getOrders(email)

  return result.data
}
