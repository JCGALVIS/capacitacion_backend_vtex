import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
import type { Refunds } from 'vtex.service-example'

import Status from './status'
import OMS from './oms'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get oms() {
    return this.getOrSet('oms', OMS)
  }

  public get refunds() {
    return this.getOrSet('refunds', masterDataFor<Refunds>('refunds'))
  }
}
