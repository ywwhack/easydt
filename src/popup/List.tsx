import * as React from 'react'
import ListItem from './ListItem'

interface IListProps {
  names: string[]
}

export default class List extends React.Component<IListProps> {
  render () {
    const { names } = this.props
    return (
      <ul>
        {names.map(
          name => <ListItem key={name} name={name}></ListItem>
        )}
      </ul>
    )
  }
}
