import React from 'react'
import './index.scss'

interface ISwitchProps {
  value: boolean
  onChange: (value: boolean) => void
}

const Switch: React.SFC<ISwitchProps> = (props) => {
  return (
    <label className='switch-component'>
      <input type='checkbox' checked={props.value} onChange={e => props.onChange(e.target.checked)} />
      <div className='switch'>
        <div className='track'></div>
      </div>
    </label>
  )
}

export default Switch
