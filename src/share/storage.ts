export const STORAGE_ACITVE_MAP = 'active_map'

export default {
  getItem (name: string): any {
    const result = localStorage.getItem(name)
    if (result !== null) {
      return JSON.parse(result)
    } else {
      return result
    }
  },
  setItem (name: string, value: any): boolean {
    try {
      localStorage.setItem(name, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }
}
