import { IMailOption } from '@/share/types'

function delay (time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}

function convertMailOptionToUrl (mailOption: IMailOption): string {
  return `mailto:${mailOption.recepient}?cc=${mailOption.copy}&subject=${mailOption.subject}`
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

    // 发送 projectName 给 extension，获取对应的邮件模板
    const activeProject = document.getElementsByClassName('p-repo p-sidebar__repo router-link-exact-active is-active')[0]
    const projectName = activeProject.getElementsByClassName('p-repo__title')[0].innerHTML
    chrome.runtime.sendMessage({ type: 'projectConfig', name: projectName }, response => {
      fakeLinkDom.href = convertMailOptionToUrl(response)
      fakeLinkDom.click()
    })
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

main().catch(() => {})
