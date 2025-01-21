import { omsService } from '../../services/omsService'

export const orders = async (_: any, __: any, ctx: Context) => {
  const result = await omsService(ctx).getOrders('email')

  return result.data
}
