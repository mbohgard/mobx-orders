import React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import { AppContainer } from 'react-hot-loader'

import api from './utils/api'
import App from './containers/App'

useStrict(true)

api.config({
  url: 'http://www.json-generator.com/api/json',
  jsonId: 'bPeADmFUKq'
})

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
