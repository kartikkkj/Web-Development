import React from 'react'
import Avatar ,{ConfigProvider} from 'react-avatar';
export default function Client({name}) {
  return (
    <div className='client'>
      <ConfigProvider color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}>
        <Avatar name={name} size={50}/>
      </ConfigProvider>
        <span className='name'>{name}</span>
    </div>
  )
}
