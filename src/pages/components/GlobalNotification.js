import React, { useState } from 'react'

const GlobalNotification = ({text}) => {
    const [showNotification,setShowNotification] = useState(true);

  return (

    <div style={showNotification?{}:{display:"none"}} className='global-notification-main'>
        <p>{text}</p>
        <i style={{position:"absolute",right:"0",marginRight:"10px",color:"#fff"}} onClick={()=>setShowNotification(false)}  className='fas fa-times'></i>
    </div>
  )
}

export default GlobalNotification