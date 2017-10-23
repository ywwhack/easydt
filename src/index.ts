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

  // 注册事件
  deployBtn.addEventListener('click', () => {
    console.log('deploy click')
    chrome.runtime.sendMessage('open mail')
  })

}

main()
