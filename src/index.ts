function delay (time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}

async function main () {
  // 获取「发布到生产」的按钮
  let deployBtnContainer: Element
  do {
    await delay(100)
    deployBtnContainer = document.getElementsByClassName('deploy-button__dropdown')[0]
  } while (!deployBtnContainer)

  const deployBtn = deployBtnContainer.getElementsByClassName('el-button')[0]
  const fakeLinkDom = document.createElement('a')

  // 注册事件
  deployBtn.addEventListener('click', () => {
    console.log('deploy click')

    fakeLinkDom.href = "mailto:"
    fakeLinkDom.click()
  })

  // 获取所有仓库名称
  let repoLinks = document.getElementsByClassName('p-repo p-sidebar__repo')
  const repoNames = Array.from(repoLinks).map(element => {
    return element.getElementsByClassName('p-repo__title')[0].innerHTML
  })

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'repoNames') {
      sendResponse(repoNames)
    }
  })
}

main()
