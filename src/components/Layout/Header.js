import React from 'react'
import HeaderCartButton from './HeaderCartButton'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'

const Header = ({ onShowCart }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart}></HeaderCartButton>
      </header>
      {/* Container div for the image */}
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Table with food" />
      </div>
    </>
  )
}

export default Header
