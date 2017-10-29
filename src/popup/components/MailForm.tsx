import * as React from 'react'
import { IMailOption } from '../types'

interface IMailOptionProps extends IMailOption {
  onRecepientChange: (recepient: string) => void
  onCopyChange: (copy: string) => void
  onSummaryChange: (summary: string) => void
  onUpdateClick: () => void
}

 const MailForm: React.SFC<IMailOptionProps> = ({ 
   recepient, copy, summary,
   onRecepientChange, onCopyChange, onSummaryChange, onUpdateClick
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
        <input value={summary} onChange={e => onSummaryChange(e.target.value)} />
      </div>
      <button onClick={onUpdateClick}>更新</button>
    </div>
  )
}

export default MailForm
