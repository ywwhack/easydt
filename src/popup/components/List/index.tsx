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

  initEditingMapForNames = (names: string[]): EditingMap => {
    return names.reduce((result: EditingMap, name) => {
      result[name] = false
      return result
    }, {})
  }
  listenerForSaveEvent = (event: KeyboardEvent) => {
    if (event.metaKey && event.which === 83) {
      event.preventDefault()
      this.setState({ editingMap: this.initEditingMapForNames(this.props.names) })
    }
  }
  handleEditingChange = (edting: boolean, name: string) => {
    const { editingMap } = this.state
    editingMap[name] = edting
    this.setState({ editingMap })
  }

  componentWillReceiveProps (nextProps: IListProps) {
    if (this.props.names.join(',') !== nextProps.names.join(',')) {
      this.setState({ editingMap: this.initEditingMapForNames(nextProps.names) })
    }
  }
  componentDidMount () {
    window.addEventListener('keydown', this.listenerForSaveEvent)
  }
  componentWillUnmount () {
    window.removeEventListener('keydown', this.listenerForSaveEvent)
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
