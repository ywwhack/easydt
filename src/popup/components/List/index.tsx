import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import ListItem from '../ListItem/index'
import { IMailOption } from '@/share/types'
import mailOptionStorage from '@/share/mailOptionStorage'
import isEqual from 'lodash/isEqual'

interface IListProps {
  names: string[]
}

interface EditingMap {
  [x: string]: boolean
}

class ListState {
  @observable editingMap: EditingMap = {}
}

@observer
export default class List extends React.Component<IListProps, {}> {
  store = new ListState()

  initEditingMapForNames = (names: string[]): EditingMap => {
    return names.reduce((result: EditingMap, name) => {
      result[name] = false
      return result
    }, {})
  }
  listenerForSaveEvent = (event: KeyboardEvent) => {
    if (event.metaKey && event.which === 83) {
      event.preventDefault()
      this.store.editingMap = this.initEditingMapForNames(this.props.names)
    }
  }
  handleEditing = (nextMailOption: IMailOption, name: string) => {
    this.store.editingMap[name] = !isEqual(nextMailOption, mailOptionStorage.getItem(name))
  }

  componentWillReceiveProps (nextProps: IListProps) {
    if (this.props.names.join(',') !== nextProps.names.join(',')) {
      this.store.editingMap = this.initEditingMapForNames(nextProps.names)
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
              editing={this.store.editingMap[name]}
              onEditing={(mailOption: IMailOption) => this.handleEditing(mailOption, name)}>
            </ListItem>
          )
        )}
      </ul>
    )
  }
}
