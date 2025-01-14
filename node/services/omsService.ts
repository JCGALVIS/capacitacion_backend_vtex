export const omsService = (ctx: Context) => {
  const {
    clients: { oms: omsClient },
  } = ctx

  return {
    getOrders: async () => omsClient.getOrders(),
    getOrdersById: async (orderId: string) => omsClient.getOrderById(orderId),
  }
}
