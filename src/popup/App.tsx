import * as React from 'react'
import List from '@/popup/components/List/index'

interface AppState {
  names: string[]
}

const headerStyle = {
  height: '44px',
  lineHeight: '44px',
  textAlign: 'center',
  backgroundColor: '#444',
  color: '#fff',
  fontSize: '18px'
}

export default class App extends React.Component<{}, AppState> {
  state = {
    names: []
  }

  componentDidMount () {
    // 在开发模式下，chrome.tabs 不存在
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id as number, { type: 'repoNames' }, (names: string[]) => {
            this.setState({ names })
          })
        }
      })
    } else {
      this.setState({ names: ['cbt', 'cbt-internal'] })
    }
  }

  render () {
    return (
      <div>
        <h1 style={headerStyle}>Settings</h1>
        <List names={this.state.names}></List>
      </div>
    )
  }
}
