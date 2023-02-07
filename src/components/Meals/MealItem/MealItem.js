import { useContext } from 'react'
import MealItemForm from './MealItemForm'
import classes from './MealItem.module.css'
import CartContext from '../../../store/cart-context'

const MealItem = ({ name, description, price, id }) => {
  const cartCTX = useContext(CartContext)

  // toFixed(2) renders price to two decimal places
  const formattedPrice = `£${price.toFixed(2)}`

  const addToCartHandler = (amount) => {
    cartCTX.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={id} />
      </div>
    </li>
  )
}

export default MealItem
