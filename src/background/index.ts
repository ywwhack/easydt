import mailOptionStorage from '@/share/mailOptionStorage'

if (chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'projectConfig') {
      sendResponse(mailOptionStorage.getItem(message.name))
    }
  })
}
