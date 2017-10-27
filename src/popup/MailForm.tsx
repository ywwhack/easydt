import * as React from 'react'

export default class MailForm extends React.Component {
  render () {
    return (
      <div>
        <div>
          <span>收件人：</span>
          <input />
        </div>
        <div>
          <span>抄送：</span>
          <input />
        </div>
        <div>
          <span>主题：</span>
          <input />
        </div>
      </div>
    )
  }
}
