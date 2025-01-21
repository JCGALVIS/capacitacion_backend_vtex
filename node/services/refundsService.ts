import type { Refunds } from '../typings/Refunds'

export const refundsService = (ctx: Context) => {
  const {
    clients: { refunds: refundsClient },
    vtex: { workspace },
  } = ctx

  refundsClient.schema = `0.3.0-${workspace}`

  return {
    save: async (refunds: Refunds) => refundsClient.save(refunds),
    list: async () => refundsClient.scroll({ fields: ['_all'] }),
    getByRefundsStatus: async (refund_status: string) =>
      refundsClient.search(
        {
          page: 1,
          pageSize: 10,
        },
        ['_all'],
        'createdIn DESC',
        `refund_status=${refund_status}`
      ),
    getRefundByOrderId: async (orderId: string) =>
      refundsClient.search(
        {
          page: 1,
          pageSize: 1,
        },
        ['_all'],
        'createdIn DESC',
        `order_id=${orderId}`
      ),
    updateRefunds: async (orderId: string) => {
      // const REFUND_STATUS = 'approved'
      const allRefundsByOrderId = await refundsClient.search(
        {
          page: 1,
          pageSize: 1,
        },
        ['_all'],
        'createdIn DESC',
        `order_id=${orderId}`
      )

      if (allRefundsByOrderId.length === 0) {
        throw new Error('No refund found for this order')
      }

      // const { id, orderItems } = allRefundsByOrderId[0];

      // refundsClient.update(, { refund_status: REFUND_STATUS })
    },
  }
}
