import { useState, useReducer } from "react"
import CartContext from "./cart-context"



const defaultCartState = {
  items: [],
  totalAmount: 0
}

//state is last state, action is the dispatch by you
const cartReducer = (state, action) => {

  if (action.type === 'ADD_ITEM') {
    const updatedItems = state.items.concat(action.item)
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  else {

  }

  return defaultCartState
}

const CartProvider = props => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


  const addItemToCartHandler = item => {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item: item
    })
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id
    })
  }


  const cartContext = {
    items: cartState.items,
    totalAmount: 0,
    addItems: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }



  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}


export default CartProvider

