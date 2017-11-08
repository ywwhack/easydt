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

interface IListItemState extends IMailOption {
  showForm: boolean
}

export default class ListItem extends React.Component<IListItemProps, IListItemState> {
  state = {
    showForm: false,
    ...mailOptionStorage.getItem(this.props.name)
  }

  handleNameClick = () => {
    this.setState({ showForm: !this.state.showForm })
  }
  handleRecepientChange = (recepient: string) => {
    this.setState({ recepient })
    this.props.onEditingChange(true)
  }
  handleCopyChange = (copy: string) => {
    this.setState({ copy })
    this.props.onEditingChange(true)
  }
  handlesubjectChange = (subject: string) => {
    this.setState({ subject })
    this.props.onEditingChange(true)
  }
  handleUpdateClick = () => {
    const { showForm, ...mailOption } = this.state
    this.props.onEditingChange(false)
    mailOptionStorage.setItem(this.props.name, mailOption)
  }

  render () {
    const { name, editing } = this.props
    const { showForm, ...mailOption } = this.state
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
