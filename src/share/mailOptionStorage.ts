import storage from '@/share/storage'
import { IMailOption } from '@/share/types'

export default {
  getItem (projectName: string): IMailOption {
    const result = storage.getItem(projectName)
    if (result) {
      return result
    } else {
      return { recepient: '', copy: '', subject: '' }
    }
  },
  setItem (projectName: string, mailOption: IMailOption): boolean {
    return storage.setItem(projectName, mailOption)
  }
}
