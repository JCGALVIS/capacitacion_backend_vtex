import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import type { InvoiceRequest } from '../typings/invoiceRequest'

const basePath = '/api/oms/pvt'

export default class OMS extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public async getOrders(email: string): Promise<any> {
    return this.http.get(this.routes.getOrders(email), {
      metric: 'get-orders',
    })
  }

  public async getOrderById(orderId: string): Promise<any> {
    return this.http.get(this.routes.getOrderById(orderId), {
      metric: 'get-orders-by-id',
    })
  }

  public async invoice(body: InvoiceRequest, orderId: string): Promise<any> {
    return this.http.post(this.routes.invoice(orderId), body, {
      metric: 'invoice-order',
    })
  }

  private get routes() {
    return {
      getOrders: (email: string) => {
        return `${basePath}/orders?q=${email}`
      },
      getOrderById: (orderId: string) => {
        return `${basePath}/orders/${orderId}`
      },
      invoice: (orderId: string) => {
        return `${basePath}/orders/${orderId}/invoice`
      },
    }
  }
}
