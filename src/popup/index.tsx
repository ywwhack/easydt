import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

// 再开发模式下，chrome.tabs 不存在
if (chrome.tabs) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id as number, { type: 'repoNames' }, (response: string[]) => {
        document.body.innerHTML = response.map(repoName => `<div>${repoName}</div>`).join('')
      })
    }
  })  
}

const root = document.getElementById('app')

render(<App />, root)
