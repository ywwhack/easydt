import * as React from 'react'
import MailForm from '../MailForm/index'
import { IMailOption } from '@/share/types'
import mailOptionStorage from '@/share/mailOptionStorage'
import './index.scss'

interface IListItemProps {
  name: string
  editing: boolean
  onEditing: Function
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
    const nextMailOption = { ...this.state.mailOption }
    nextMailOption.recepient = recepient
    this.setState({ mailOption: nextMailOption })
    this.props.onEditing(nextMailOption)
  }
  handleCopyChange = (copy: string) => {
    const nextMailOption = { ...this.state.mailOption }
    nextMailOption.copy = copy
    this.setState({ mailOption: nextMailOption })
    this.props.onEditing(nextMailOption)
  }
  handleSubjectChange = (subject: string) => {
    const nextMailOption = { ...this.state.mailOption }
    nextMailOption.subject = subject
    this.setState({ mailOption: nextMailOption })
    this.props.onEditing(nextMailOption)
  }
  handleUpdateClick = () => {
    const { mailOption } = this.state
    mailOptionStorage.setItem(this.props.name, mailOption)
    this.props.onEditing(mailOption)
  }

  componentDidUpdate () {
    if (!this.props.editing) {
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
            onSubjectChange={this.handleSubjectChange}
            onUpdateClick={this.handleUpdateClick} />
        }
      </li>
    )
  }
}
