import React from 'react'

const DeliveryProgress = (props) => {
 
  const {step} = props;

  return (
    <ol class="progtrckr" data-progtrckr-steps="3" style={{margin:"20px 0px"}}>
    <li class={step>=1?"progtrckr-done":"progtrckr-todo"}><i class="fas fa-file-invoice" style={{marginRight:"10px",color:(step>=1?'yellowgreen':'')}}></i>Confirmed</li>
 
    <li class={step>=2?"progtrckr-done":"progtrckr-todo"}><i class="fas fa-truck" style={{marginRight:"10px",color:(step>=2?'yellowgreen':'')}}></i>Shipped</li>
    <li class={step>=3?"progtrckr-done":"progtrckr-todo"}><i class="fas fa-check" style={{marginRight:"10px",color:(step>=3?'yellowgreen':'')}}></i>Delivered</li>
</ol>
  )
}

export default DeliveryProgress