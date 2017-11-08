import * as React from 'react'
import ListItem from '../ListItem/index'

interface IListProps {
  names: string[]
}

interface EditingMap {
  [x: string]: boolean
}

interface IListState {
  editingMap: EditingMap
}

export default class List extends React.Component<IListProps, IListState> {
  state = {
    editingMap: {} as EditingMap
  }

  handleEditingChange = (edting: boolean, name: string) => {
    const { editingMap } = this.state
    editingMap[name] = edting
    this.setState({ editingMap })
  }
  componentWillReceiveProps (nextProps: IListProps) {
    const editingMap = nextProps.names.reduce((result: EditingMap, name) => {
      result[name] = false
      return result
    }, {})
    this.setState({ editingMap })
  }
  render () {
    const { names } = this.props
    return (
      <ul>
        {names.map(
          name => (
            <ListItem key={name} name={name}
              editing={this.state.editingMap[name]}
              onEditingChange={(editing: boolean) => this.handleEditingChange(editing, name)}>
            </ListItem>
          )
        )}
      </ul>
    )
  }
}
