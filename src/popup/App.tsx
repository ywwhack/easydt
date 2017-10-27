import * as React from 'react'
import List from './List'

const headerStyle = {
  height: '44px',
  lineHeight: '44px',
  textAlign: 'center',
  backgroundColor: '#444',
  color: '#fff',
  fontSize: '18px'
}

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1 style={headerStyle}>Settings</h1>
        <List names={['cbt', 'cbt-internal']}></List>
      </div>
    )
  }
}
