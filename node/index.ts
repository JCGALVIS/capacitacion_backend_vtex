import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import { getOrders } from './middlewares/oms/getOrders'
import { orders } from './resolvers/oms/oms'
import { getRefunds } from './middlewares/refunds/getRefunds'
import { saveRefund } from './middlewares/refunds/saveRefund'
import { updateRefund } from './middlewares/refunds/updateRefund'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        orders,
      },
    },
  },
  routes: {
    status: method({
      GET: [validate, status],
    }),
    orders: method({
      GET: [getOrders],
    }),
    refunds: method({
      GET: [getRefunds],
    }),
    createRefund: method({
      POST: [saveRefund],
    }),
    updateRefund: method({
      PUT: [updateRefund],
    })
  },
})
