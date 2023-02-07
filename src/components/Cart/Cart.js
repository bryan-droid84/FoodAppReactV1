import { useContext } from 'react'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'

const Cart = ({ onClose }) => {
  const cartCTX = useContext(CartContext)

  // use tofixed to convert each totalamount to two decimal places
  const totalAmount = `£${cartCTX.totalAmount.toFixed(2)}`
  const hasItems = cartCTX.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCTX.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCTX.addItem({ ...item, amount: 1 })
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {' '}
      {cartCTX.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // if we want to pass params, we can either use bind (the first param is not used here, so we can write anything in this place) ...

          // onRemove={cartItemRemoveHandler.bind(null, param)}
          // ..., or we can create an anonymous function:

          // onAdd={() => cartItemAddHandler(param)}
          // Check Section 12 video 194 on React with stephen for a reminder or Section 11 video 180
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={onClose} className={classes['button--alt']}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
