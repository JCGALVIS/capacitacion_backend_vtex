export const omsService = (ctx: Context) => {
  const {
    clients: { oms: omsClient },
  } = ctx

  return {
    getOrders: async (email: string) => omsClient.getOrders(email),
    getOrdersById: async (orderId: string) => omsClient.getOrderById(orderId),
    invoice: async (body: any, orderId: string) =>
      omsClient.invoice(body, orderId),
  }
}
