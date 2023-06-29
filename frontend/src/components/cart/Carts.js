import React from 'react'
import "./carts.css"

const Carts = ({image}) => {
  return (
        <div className="cartItem">
            <img src={image.webformatURL} alt="" className='cart-image' />
        </div>
  )
}

export default Carts