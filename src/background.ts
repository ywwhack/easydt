chrome.runtime.onMessage.addListener(message => {
  if (message === 'open mail') {
    const port = chrome.runtime.connectNative('com.ele.easydt')
    port.onDisconnect.addListener(() => {
      if (chrome.runtime.lastError) {
        console.log("Failed to connect: " + chrome.runtime.lastError.message)
      }
    })
  }
})
