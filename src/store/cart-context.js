import React from 'react'

// Created with default data that is not used but assists with auto IDE completion
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
})

export default CartContext
