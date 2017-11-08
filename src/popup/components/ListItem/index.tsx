import * as React from 'react'
import MailForm from '../MailForm/index'
import { IMailOption } from '@/share/types'
import mailOptionStorage from '@/share/mailOptionStorage'
import './index.scss'

interface IListItemProps {
  name: string
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
  }
  handleCopyChange = (copy: string) => {
    this.setState({ copy })
  }
  handlesubjectChange = (subject: string) => {
    this.setState({ subject })
  }
  handleUpdateClick = () => {
    const { showForm, ...mailOption } = this.state
    mailOptionStorage.setItem(this.props.name, mailOption)
  }

  render () {
    const { name } = this.props
    const { showForm, ...mailOption } = this.state
    return (
      <li className='list-item-component'>
        <p className='title' onClick={this.handleNameClick}>{ name }</p>
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
