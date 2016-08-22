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

      if (!OrderStore.initialized) OrderStore.init()

      if (UIState.searchLoading) UIState.setLoader('search', false)
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

  selectOrder: orderId => {
    OrderStore.setActiveOrderId(orderId)

    if (orderId) OrderActions.getOrder(orderId)
  },

  searchOrder: value => {
    UIState.setSearchValue(value)

    if (!value || value.length > 2) UIState.setLoader('search', true)

    if (value && value.length > 2) {
      api.getOrders(value).then(orders => {
        let sortedOrders

        OrderStore.addOrder(orders)

        if (orders.length) {
          sortedOrders = OrderStore.ordersByDepartureTime

          if (sortedOrders) {
            OrderActions.selectOrder(sortedOrders[0].orderId)
          }
        }

        UIState.setLoader('search', false)
      })
    } else if (!value) OrderActions.getOrders()
  }
}

export default OrderActions
