import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = ({ onClick }) => {
  const [btnIsHiglighted, setBtnIsHighlighted] = useState(false)
  const cartCTX = useContext(CartContext)

  // Object destructuring
  const { items } = cartCTX

  // Reduce method is used to transform an array of items into a single value
  // First argument is a function and the second value is a starting value
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHiglighted ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    console.log('running')

    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
      console.log('cleanup')
    }
  }, [items])

  return (
    <button onClick={onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
