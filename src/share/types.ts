export interface IMailOption {
  recepient: string
  copy: string
  subject: string
}

export interface IObject<T> {
  [x: string]: T
}

export interface IActiveMap extends IObject<boolean> {}
