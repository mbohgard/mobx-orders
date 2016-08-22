import React from 'react'
import { observer } from 'mobx-react'
const Loader = require('react-loaders').Loader;

const Order = (o, close) => (
  <div className="order-details">
    <strong>Nr: {o.orderId}</strong><br />

    <strong className="separated">Status:</strong> {o.status}<br />
    <strong>Avresetid:</strong> {o.departureTime}<br />
    <strong>Från:</strong> {o.from.streetName} {o.from.streetNumber}, {o.from.city}<br />
    <strong>Till:</strong> {o.to.streetName} {o.to.streetNumber}, {o.to.city}<br />

    <strong className="separated">Bilnr:</strong> {o.vehicle}<br />
    <strong>Förare:</strong> {o.driver.name}({o.driver.id})<br />

    <strong className="separated">Namn:</strong> {o.name}<br />
    <strong>Pris:</strong> {o.price ? o.price : 'Taxameter'}<br />
    <strong>Phone number:</strong> {o.phoneNumber}<br />
    <strong>Egenskaper:</strong> {o.vehicleAttributes.length ?
      o.vehicleAttributes.join(', ') : '-'}<br />

    <strong className="separated-extra">Bokningshändelser:</strong>

    {o.orderEvents.map((event, index) => (
      <div className="order-event" key={ index }>
        <strong>{event.time}</strong> {event.description}
      </div>
    ))}

    <a onClick={ close }>Close</a>
  </div>
)

const Loading = () => (
  <div>
    <Loader type="ball-scale-multiple" active={true} /> Getting order...
  </div>
)

const OrderDetails = observer(({ order, close }) => {
  if (order) return Order(order, close)
  else return (
    <div className="order-details">
      { order === undefined ? <Loading /> : 'No order selected.' }
    </div>
  )
})

export default OrderDetails
