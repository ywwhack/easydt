import * as React from 'react'
import { IMailOption } from '../types'

interface IMailOptionProps extends IMailOption {
  onRecepientChange: (recepient: string) => void
  onCopyChange: (copy: string) => void
  onsubjectChange: (subject: string) => void
  onUpdateClick: () => void
}

 const MailForm: React.SFC<IMailOptionProps> = ({ 
   recepient, copy, subject,
   onRecepientChange, onCopyChange, onsubjectChange, onUpdateClick
  }) => {
  return (
    <div>
      <div>
        <span>收件人：</span>
        <input value={recepient} onChange={e => onRecepientChange(e.target.value)} />
      </div>
      <div>
        <span>抄送：</span>
        <input value={copy} onChange={e => onCopyChange(e.target.value)} />
      </div>
      <div>
        <span>主题：</span>
        <input value={subject} onChange={e => onsubjectChange(e.target.value)} />
      </div>
      <button onClick={onUpdateClick}>更新</button>
    </div>
  )
}

export default MailForm
