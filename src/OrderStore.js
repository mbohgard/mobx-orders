import { observable, computed, extendObservable, action, asFlat, asMap } from 'mobx'
import findIndex from 'lodash/findIndex'
import isPlainObject from 'lodash/isPlainObject'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'

class OrderStore {
  @observable initialized = false
  orders = observable(asFlat([]))
  @observable activeOrderId = null
  detailedOrders = observable(asFlat([]))

  @computed get ordersByDepartureTime() {
    return sortBy(this.orders, order => order.departureTime)
  }

  getDetailedOrder(orderId) {
    return find(this.detailedOrders, order => order.orderId === orderId)
  }

  @action init() {
    this.initialized = true
  }

  @action addOrder(payload) {
    // add many
    if (Array.isArray(payload)) this.orders.replace(payload)

    // add single order
    else if (isPlainObject(payload)) this.orders.push(payload)
  }

  @action addDetailedOrder(payload) {
    const index = findIndex(this.detailedOrders,
      order => order.orderId === payload.orderId
    )
    const newOrder = {
      ...payload,
      lastUpdated: new Date()
    }

    if (index < 0) this.detailedOrders.push(newOrder)
    else this.detailedOrders[index] = newOrder
  }

  @action setActiveOrderId(id = null) {
    this.activeOrderId = id
  }
}

const orderStore = new OrderStore()

export default orderStore
