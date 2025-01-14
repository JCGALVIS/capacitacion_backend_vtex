import { InstanceOptions, IOContext, JanusClient } from "@vtex/api"

const basePath = "/api/oms/pvt"

export default class OMS extends JanusClient{
  constructor(context: IOContext, options?: InstanceOptions){
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
      }
    })
  }

  public async getOrders(): Promise<any> {
    return this.http.get(this.routes.getOrders(), {
      metric: "get-orders"
    })
  }

  private get routes() {
    return {
      getOrders: () => {
        return `${basePath}/orders`
      },
      getOrderById: (orderId: string) => {
        return `${basePath}/orders${orderId}`
      }
    }
  }
}


