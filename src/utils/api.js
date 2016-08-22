import OrderStore from '../OrderStore'
import find from 'lodash/find'
import random from 'lodash/random'
import foundInObject from './helpers'

let url, jsonId

const timers = {
  orders: {},
  order: {}
}

function fetchOrders() {
  return fetch(`${url}/get/${jsonId}`).then(res => res.json())
}

export default {
  config: opts => {
    url = opts.url
    jsonId = opts.jsonId
  },

  getOrders: (searchValue) => {
    if (searchValue) {
      return new Promise((resolve) => {
        fetchOrders().then(orders => {
          const results = orders.filter(order => {
            return foundInObject(order, searchValue)
          })

          clearTimeout(timers.orders)

          timers.orders = setTimeout(() => {
            resolve(results)
          }, random(300, 1000))
        })
      })
    } else return fetchOrders()
  },

  getOrder: orderId => {
    const order = find(OrderStore.orders, order => order.orderId === orderId)

    clearTimeout(timers.order)

    return new Promise((resolve) => {
      timers.order = setTimeout(() => {
        resolve(order)
      }, random(250, 1500))
    })
  }
}
