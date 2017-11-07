import { IMailOption } from '../types'

export default {
  getItem (projectName: string): IMailOption {
    let result
    if (result = localStorage.getItem(projectName)) {
      return JSON.parse(result)
    } else {
      return { recepient: '', copy: '', subject: '' }
    }
  },
  setItem (projectName: string, mailOption: IMailOption) {
    localStorage.setItem(projectName, JSON.stringify(mailOption))
  }
}
