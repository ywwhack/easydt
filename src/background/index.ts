import mailOptionStorage from '../popup/utils/mailOptionStorage'

if (chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'projectConfig') {
      sendResponse(mailOptionStorage.getItem(message.name))
    }
  })
}
