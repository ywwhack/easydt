import mailOptionStorage from '@/share/mailOptionStorage'
import storage, { STORAGE_ACITVE_MAP } from '@/share/storage'

if (chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'projectConfig') {
      // 如果指定项目禁用 📧 功能，那么 response = null，content/index.js 将不再唤醒 📧 app
      const name = message.name
      const activeMap = storage.getItem(STORAGE_ACITVE_MAP)
      const response = activeMap[name] ? mailOptionStorage.getItem(name) : null

      sendResponse(response)
    }
  })
}
