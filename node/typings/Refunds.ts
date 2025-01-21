export interface Refunds {
  /**
   * Customer name
   */
  first_name: string
  /**
   * Customer last name
   */
  last_name?: string
  /**
   * Customer id
   */
  customer_id: number
  /**
   * Order id
   */
  order_id: string
  /**
   * Refund method
   */
  refund_method: 'credit_card' | 'bank_slip' | 'bonus'
  /**
   * Refund status
   */
  refund_status: 'pending' | 'approved' | 'denied'
  /**
   * Items
   */
  items?: [
    {
      /**
       * Item id
       */
      item_id?: string
      /**
       * Item name
       */
      item_name?: string
      /**
       * Item price
       */
      item_price?: number
      /**
       * Item quantity
       */
      quantity?: number
      /**
       * Refund description
       */
      refunds_description?: string
      [k: string]: unknown
    }
  ]
  [k: string]: unknown
}
