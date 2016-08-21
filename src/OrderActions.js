import api from './utils/api'
import OrderStore from './OrderStore'
import UIState from './UIState'

function shouldUpdateOrder(order) {
  if (!order) return true

  const diff = new Date() - order.lastUpdated
  const minutes = diff/60/1000

  return minutes > 1
}

const OrderActions = {
  getOrders: () => {
    api.getOrders().then(orders => {
      OrderStore.addOrder(orders)
    })
  },

  getOrder: orderId => {
    const detailedOrder = OrderStore.getDetailedOrder(orderId)

    if (!shouldUpdateOrder(detailedOrder)) return

    UIState.setLoader('order', true)

    api.getOrder(orderId).then(order => {
      OrderStore.addDetailedOrder(order)

      UIState.setLoader('order', false)
    })
  },

  removeOrder: id => {
    // todo: request to delete order

    OrderStore.removeOrder(id)
  },

  selectOrder: orderId => {
    OrderStore.setActiveOrderId(orderId)

    if (orderId) OrderActions.getOrder(orderId)
  },

  searchOrder: value => {
    OrderStore.searchOrder(value)
  }
}

export default OrderActions
