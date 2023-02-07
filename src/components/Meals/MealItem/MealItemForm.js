import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = ({ id, onAddToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value
    // convert enteredAmount to a number from a string
    const enteredAmountNumber = +enteredAmount

    // If any of the following conditions are true exit the submitHandler function
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return
    }
    setAmountIsValid(true)
    onAddToCart(enteredAmountNumber)
  }

  const input = {
    id: 'amount_' + id,
    type: 'number',
    min: '1',
    max: '5',
    step: '1',
    defaultValue: '1',
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input ref={amountInputRef} label="Amount" input={input} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter an amount between 1-5.</p>}
    </form>
  )
}

export default MealItemForm
