import React from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef(({ input, label }, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      {/* {...input} adds all key value pairs from the input object as props to the input */}
      <input ref={ref} {...input} />
    </div>
  )
})

export default Input
