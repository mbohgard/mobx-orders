import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import isPlainObject from 'lodash/isPlainObject'
import find from 'lodash/find'

import UIState from '../UIState'
import OrderStore from '../OrderStore'
import OrderActions from '../OrderActions'

import Search from '../components/Search'
import Orders from '../components/Orders'
import OrderDetails from '../components/OrderDetails'

import '../styles/main.scss'

@observer
export default class App extends Component {
  componentDidMount() {
    OrderActions.getOrders()
  }

  _closeOrderDetails() {
    OrderActions.selectOrder()
  }

  render() {
    const activeOrder = OrderStore.activeOrderId ?
      OrderStore.getDetailedOrder(OrderStore.activeOrderId) : null

    return (
      <div className="app-container">
        <Search
          search={ OrderActions.searchOrder }
          loading={ UIState.searchLoading }
          value={ UIState.searchValue }
        />

        { OrderStore.orders.length ?
          <Orders
            orders={ OrderStore.ordersByDepartureTime }
            activeOrderId={ OrderStore.activeOrderId }
            selectOrder={ OrderActions.selectOrder }
          /> : OrderStore.initialized ? 'No orders found' : 'Loading...'
        }

        <OrderDetails
          order={ activeOrder }
          close= { this._closeOrderDetails }
        />
        <DevTools />
      </div>
    )
  }
}
