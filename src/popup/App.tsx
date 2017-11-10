import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import List from '@/popup/components/List/index'
import storage, { STORAGE_ACITVE_MAP } from '@/share/storage'
import { IActiveMap } from '@/share/types'

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

class AppState {
  @observable names: string[] = []
}

@observer
export default class App extends React.Component<{}, {}> {
  store = new AppState()

  initActiveMap = (names: string[]) => {
    // 如果之前已经在 localStorage 中进行过初始化，则不再处理
    if (storage.getItem(STORAGE_ACITVE_MAP)) return

    const activeMap = names.reduce((result: IActiveMap, name) => {
      result[name] = true
      return result
    }, {})
    storage.setItem(STORAGE_ACITVE_MAP, activeMap)
  }

  componentDidMount () {
    // 在开发模式下，chrome.tabs 不存在
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id as number, { type: 'repoNames' }, (names: string[]) => {
            this.initActiveMap(names)
            this.store.names = names
          })
        }
      })
    } else {
      const names = ['cbt', 'cbt-internal']
      this.initActiveMap(names)
      this.store.names = names
    }
  }

  render () {
    return (
      <div>
        <h1 style={headerStyle}>Settings</h1>
        <List names={this.store.names}></List>
      </div>
    )
  }
}
