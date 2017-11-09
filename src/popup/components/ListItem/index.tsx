import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import MailForm from '../MailForm/index'
import { IMailOption } from '@/share/types'
import mailOptionStorage from '@/share/mailOptionStorage'
import './index.scss'

interface IListItemProps {
  name: string
  editing: boolean
  onEditing: Function
}

class ListItemState {
  @observable showForm = false
  @observable mailOption: IMailOption

  constructor (name: string) {
    this.mailOption = mailOptionStorage.getItem(name)
  }
}

@observer
export default class ListItem extends React.Component<IListItemProps, {}> {
  store = new ListItemState(this.props.name)

  handleNameClick = () => {
    this.store.showForm = !this.store.showForm
  }
  handleRecepientChange = (recepient: string) => {
    const { mailOption } = this.store
    mailOption.recepient = recepient
    this.props.onEditing(mailOption)
  }
  handleCopyChange = (copy: string) => {
    const { mailOption } = this.store
    mailOption.copy = copy
    this.props.onEditing(mailOption)
  }
  handleSubjectChange = (subject: string) => {
    const { mailOption } = this.store
    mailOption.subject = subject
    this.props.onEditing(mailOption)
  }
  handleUpdateClick = () => {
    const { mailOption } = this.store
    mailOptionStorage.setItem(this.props.name, mailOption)
    this.props.onEditing(mailOption)
  }

  componentDidUpdate () {
    if (!this.props.editing) {
      mailOptionStorage.setItem(this.props.name, this.store.mailOption)
    }
  }

  render () {
    const { name, editing } = this.props
    const { showForm, mailOption } = this.store
    return (
      <li className='list-item-component'>
        <p className='title' onClick={this.handleNameClick}>
          { name }
          { editing && <span className='dot'></span> }
        </p>
        {
          showForm &&
          <MailForm {...mailOption}
            onRecepientChange={this.handleRecepientChange}
            onCopyChange={this.handleCopyChange}
            onSubjectChange={this.handleSubjectChange}
            onUpdateClick={this.handleUpdateClick} />
        }
      </li>
    )
  }
}
