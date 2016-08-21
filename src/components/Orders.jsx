import React from 'react'
import { observer } from 'mobx-react'

const Orders = observer(({ orders, activeOrderId, selectOrder }) => {
  return (
    <div className="orders">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Avresetid</th>
            <th>Från</th>
            <th>Till</th>
            <th>Namn</th>
            <th>Telefonnr</th>
            <th>Bokningsnr</th>
          </tr>
          { orders.map(order => {
            const classes = activeOrderId === order.orderId ? 'active' : ''

            return (
              <tr
                key={ order.id }
                className={ classes }
                onClick={ () => { selectOrder(order.orderId) } }
              >
                <td>{ order.status }</td>
                <td>{ order.departureTime }</td>
                <td>
                  { order.from.streetName} { order.from.streetNumber }, { order.from.city }
                </td>
                <td>
                  { order.to.streetName} { order.to.streetNumber }, { order.to.city }
                </td>
                <td>{ order.name }</td>
                <td>{ order.phoneNumber }</td>
                <td>{ order.orderId }</td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </div>
  )
})

export default Orders
