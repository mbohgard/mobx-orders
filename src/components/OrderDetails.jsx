import React from 'react'
import { observer } from 'mobx-react'

const Order = (order, close) => (
  <div className="order-details">
    { order.orderId } <a onClick={ close }>Close</a>
  </div>
)

const OrderDetails = observer(({ order, close }) => {
  if (order) return Order(order, close)
  else return (
    <div className="order-details">
      { order === undefined ? 'Loading...' : 'No order selected.' }
    </div>
  )
})

export default OrderDetails
