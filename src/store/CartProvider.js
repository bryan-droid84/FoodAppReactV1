import { useReducer } from 'react'

import CartContext from './cart-context'

const ACTIONS = {
  ADD_ITEM: 'add_item',
  REMOVE_ITEM: 'remove_item',
}

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

// Create the reducer outside the CartProvider component as it wont need anything from it
const cartReducer = (state, action) => {
  // Variable declarations
  let updatedTotalAmount
  let existingCartItemIndex
  let existingCartItem
  let updatedItems

  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount
      // concat adds items to an array, it does not edit the existing array but returns a new array

      // Use findIndex to find the index of an item inside of an array
      existingCartItemIndex = state.items.findIndex(
        // checks if current item in the array has the same id as the item we want to add to the array, return its index in the array
        (item) => item.id === action.payload.id
      )

      // Only applicable if state.items.findIndex has found a valid index, otherwise existingCartItem will return null
      existingCartItem = state.items[existingCartItemIndex]
      console.log(existingCartItem)

      // if existingCartItem is truthy
      if (existingCartItem) {
        // Copy existingCartItem to updateItem but update the amount
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        }
        // copy existing state.items to a new array without updating the old array in memory
        updatedItems = [...state.items]
        // replace the item object in the items array with the updatedItem Object
        updatedItems[existingCartItemIndex] = updatedItem
      }
      // If an item is added for the first time to the items array
      else {
        // use the concat method to add a new item object to the items array and create a new updatedItems array
        updatedItems = state.items.concat(action.payload)
        console.log(updatedItems)
      }

      // update Items with the new updatedItems array of objects and update the totalAmount with updatedTotalAmount
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }

    case ACTIONS.REMOVE_ITEM:
      existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      )
      console.log(existingCartItemIndex)

      existingCartItem = state.items[existingCartItemIndex]
      updatedTotalAmount = state.totalAmount - existingCartItem.price

      // check if only one item of that type exists in the items array
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload)
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }

    default:
      return defaultCartState
  }
}

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: ACTIONS.ADD_ITEM, payload: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: ACTIONS.REMOVE_ITEM, payload: id })
  }

  // This is where the real functionality exists and will be used for updating properties
  // and contains pointers to the functions
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

export default CartProvider
