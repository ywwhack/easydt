import * as React from 'react'
import MailForm from '../MailForm/index'
import { IMailOption } from '@/share/types'
import mailOptionStorage from '@/share/mailOptionStorage'
import './index.scss'

interface IListItemProps {
  name: string
  editing: boolean
  onEditingChange: Function
}

interface IListItemState {
  showForm: boolean
  mailOption: IMailOption
}

export default class ListItem extends React.Component<IListItemProps, IListItemState> {
  state = {
    showForm: false,
    mailOption: mailOptionStorage.getItem(this.props.name)
  }

  handleNameClick = () => {
    this.setState({ showForm: !this.state.showForm })
  }
  handleRecepientChange = (recepient: string) => {
    const oldMailOption = { ...this.state.mailOption }
    oldMailOption.recepient = recepient
    this.setState({ mailOption: oldMailOption })
    this.props.onEditingChange(true)
  }
  handleCopyChange = (copy: string) => {
    const oldMailOption = { ...this.state.mailOption }
    oldMailOption.copy = copy
    this.setState({ mailOption: oldMailOption })
    this.props.onEditingChange(true)
  }
  handlesubjectChange = (subject: string) => {
    const oldMailOption = { ...this.state.mailOption }
    oldMailOption.subject = subject
    this.setState({ mailOption: oldMailOption })
    this.props.onEditingChange(true)
  }
  handleUpdateClick = () => {
    const { mailOption } = this.state
    this.props.onEditingChange(false)
    mailOptionStorage.setItem(this.props.name, mailOption)
  }

  componentWillReceiveProps (nextProps: IListItemProps) {
    if (nextProps.editing !== this.props.editing) {
      mailOptionStorage.setItem(this.props.name, this.state.mailOption)
    }
  }

  render () {
    const { name, editing } = this.props
    const { showForm, mailOption } = this.state
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
            onsubjectChange={this.handlesubjectChange}
            onUpdateClick={this.handleUpdateClick} />
        }
      </li>
    )
  }
}
