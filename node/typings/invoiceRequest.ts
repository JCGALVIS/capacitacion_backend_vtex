export interface InvocieRequest {
  type: string
  issuanceDate: Date
  invoiceNumber: string
  invoiceValue: string
  invoiceKey?: string
  invoiceUrl?: string
  embeddedInvoice?: string
  courier?: string
  trackingNumber?: string
  trackingUrl?: string
  dispatchedDate?: Date
  items: Item[]
}

export interface Item {
  id: string
  price: number
  description?: string
  quantity: number
}
