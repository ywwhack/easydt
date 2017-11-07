import { IMailOption } from '@/share/types'

export default {
  getItem (projectName: string): IMailOption {
    const result = localStorage.getItem(projectName)
    if (result) {
      return JSON.parse(result)
    } else {
      return { recepient: '', copy: '', subject: '' }
    }
  },
  setItem (projectName: string, mailOption: IMailOption) {
    localStorage.setItem(projectName, JSON.stringify(mailOption))
  }
}
