import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const root = document.getElementById('app')

render(
  <AppContainer>
    <App />
  </AppContainer>,
  root
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require<{default: typeof App}>('./App').default
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      root
    )
  })
}
