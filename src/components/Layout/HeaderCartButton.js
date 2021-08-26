import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'


const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)
  const [btnHighlight, setBtnHighlight] = useState(false)
  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`

  const { items } = cartCtx

  useEffect(() => {
    if (items === 0) return;
    setBtnHighlight(true)

    const timer = setTimeout(() => {
      setBtnHighlight(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }

  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton



