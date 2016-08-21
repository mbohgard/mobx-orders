import OrderStore from '../OrderStore'
import find from 'lodash/find'
import random from 'lodash/random'

let url, jsonId

let mockTimer

export default {
  config: opts => {
    url = opts.url
    jsonId = opts.jsonId
  },

  getOrders: () => {
    return fetch(`${url}/get/${jsonId}`).then(res => res.json())
  },

  getOrder: orderId => {
    const order = find(OrderStore.orders, order => order.orderId === orderId)

    clearTimeout(mockTimer)

    return new Promise((resolve) => {
      mockTimer = setTimeout(() => {
        resolve(order)
      }, random(500, 3000))
    })
  }
}
