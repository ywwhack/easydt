import * as React from 'react'
import { IMailOption } from '@/share/types'
import './index.scss'

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
    <div className='mail-form-component'>
      <div className='form-item'>
        <span className='label'>收件人：</span>
        <input className='input' placeholder='请输入收件人邮箱，多个邮件地址以「,」分割'
          value={recepient} onChange={e => onRecepientChange(e.target.value)} />
      </div>
      <div className='form-item'>
        <span className='label'>抄送：</span>
        <input className='input' placeholder='请输入抄送人邮箱，多个邮件地址以「,」分割'
          value={copy} onChange={e => onCopyChange(e.target.value)} />
      </div>
      <div className='form-item'>
        <span className='label'>主题：</span>
        <input className='input' placeholder='请输入主题内容'
          value={subject} onChange={e => onsubjectChange(e.target.value)} />
      </div>
      <div className='btn-wrapper'>
        <button className='btn' onClick={onUpdateClick}>保存</button>
      </div>
    </div>
  )
}

export default MailForm
