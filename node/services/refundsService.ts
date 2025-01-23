import type { InvoiceRequest } from '../typings/invoiceRequest'
import type { Refunds } from '../typings/Refunds'
import { omsService } from './omsService'

export const refundsService = (ctx: Context) => {
  const {
    clients: { refunds: refundsClient },
    vtex: { workspace },
  } = ctx

  refundsClient.schema = `0.3.0-${workspace}`

  return {
    save: async (refund: Refunds) => {
      try {
        const response = await refundsClient.save(refund)

        return response
      } catch (error) {
        console.error('error: ', error)
        throw new Error(error)
      }
    },
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
    updateRefunds: async (id: string) => {
      const REFUND_STATUS = 'approved'
      const responseRefund = (await refundsClient.get(id, ['_all'])) as Refunds

      if (!responseRefund) {
        throw new Error('No refund found for this order')
      }

      const {
        first_name: firstName,
        last_name: lastName,
        customer_id: customerId,
        order_id: orderId,
        refund_method: refundMethod,
        items,
      } = responseRefund

      const totalValues = items?.reduce(
        (sum, item) => sum + item.item_price * item.quantity,
        0
      )

      const bodyInvoice: InvoiceRequest = {
        type: 'Input',
        issuanceDate: new Date(),
        invoiceNumber: '001',
        invoiceValue: totalValues.toString(),
        items: items.map(({ item_id, item_price, item_name, quantity }) => ({
          id: item_id,
          price: item_price,
          description: item_name,
          quantity,
        })),
      }

      const responseInvoice = await omsService(ctx).invoice(
        bodyInvoice,
        orderId
      )

      if (!responseInvoice) throw new Error('Error invoice')

      responseRefund.refund_status = REFUND_STATUS

      await refundsClient.update(id, {
        first_name: firstName,
        last_name: lastName,
        customer_id: customerId,
        order_id: orderId,
        refund_method: refundMethod,
        refund_status: REFUND_STATUS,
        items,
      })

      return 'Ok'
    },
  }
}
