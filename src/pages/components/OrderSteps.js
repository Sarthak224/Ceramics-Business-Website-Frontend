import React from 'react'

const OrderSteps = ({step}) => {
    let width=0;
    if(step==1){
        width="47%"
    }
    else if(step==2){
        width="82%"
    }
    return (
        <div className='finria-sans'>
        <div className='order-steps-header desktop' style={{ width: "100%", padding: "30px", margin: "0px auto", marginBottom: "50px", backgroundColor: "#f6f6f6c4" }} >

            <div className='steps-success-border' style={{width}}></div>
            <div style={{ textAlign: "center",position:"relative" }}><div className={'circle-1 '+(step>=1?'active-circle':'')}>{step>1?<i className='fas fa-check'/>:<i class="bi bi-bag-dash-fill"></i>}</div><span className='order-steps-detail'><i class="bi bi-bag-check-fill"></i><b>Your Cart</b></span></div>
            <div style={{ textAlign: "center",position:"relative"  }}><div className={'circle-1 '+(step>=2?'active-circle':'')}>{step>2?<i className='fas fa-check'/>:<i class="bi bi-cart-dash-fill"></i>}</div><span className='order-steps-detail'><i class="bi bi-cart-check-fill"></i><b>Checkout Details</b></span></div>
            <div style={{ textAlign: "center",position:"relative"  }}><div className={'circle-1 '+(step>=3?'active-circle':'')}>{step>3?<i className='fas fa-check'/>:<i class="bi bi-credit-card-2-back-fill"></i>}</div><span className='order-steps-detail'><i class="bi bi-credit-card-2-back-fill"></i><b>Payment</b></span></div>


        </div>

        <div className='order-steps-header mobile' style={{ width: "100%", padding: "30px", margin: "0px auto", marginBottom: "50px", backgroundColor: "#f6f6f6c4" }} >

            <div className='steps-success-border' style={{width}}></div>
            <div style={{ textAlign: "center",position:"relative" }}><div className={'circle-1 '+(step>=1?'active-circle':'')}><i class="bi bi-bag-check-fill"></i></div><span><b>Your Cart</b></span></div>
            <div style={{ textAlign: "center",position:"relative"  }}><div className={'circle-1 '+(step>=2?'active-circle':'')}><i class="bi bi-cart-check-fill"></i></div><span><b>Checkout Details</b></span></div>
            <div style={{ textAlign: "center",position:"relative"  }}><div className={'circle-1 '+(step>=3?'active-circle':'')}><i class="bi bi-credit-card-2-back-fill"></i></div><span><b>Payment</b></span></div>


        </div>
        </div>
    )
}

export default OrderSteps