import * as React from 'react'
import MailForm from './MailForm'

interface IListItemProps {
  name: string
}

interface IListItemState {
  showForm: boolean
}

const liStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer'
}

export default class ListItem extends React.Component<IListItemProps, IListItemState> {
  state = {
    showForm: false
  }

  handleNameClick = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render () {
    const { name } = this.props
    const { showForm } = this.state
    return (
      <li style={liStyle}>
        <p onClick={this.handleNameClick}>{ name }</p>
        {showForm && <MailForm />}
      </li>
    )
  }
}
