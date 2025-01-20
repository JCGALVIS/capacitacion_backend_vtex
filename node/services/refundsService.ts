import { Refunds } from "vtex.service-example"
import { RefundsStatus } from "../enums/refundsStatus"

export const refundsService = (ctx: Context) => {
  const { clients: { refunds: refundsClient }, vtex: { workspace } } = ctx
  refundsClient.schema = `0.3.0-${workspace}`
  return {
    save: async (refunds: Refunds) => refundsClient.save(refunds),
    list: async () => refundsClient.scroll({ fields: ['_all'] }),
    getByRefundsStatus: async (refund_status: string) => refundsClient.search({
      page: 1,
      pageSize: 10
    }, ['_all'], 'createdIn DESC', `refund_status=${refund_status}`),
    updateRefundsStatus: async (id: string, refund_status: RefundsStatus) => refundsClient.update(id, { refund_status }),
  }
}

  