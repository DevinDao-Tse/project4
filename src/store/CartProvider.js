import { useState, useReducer } from "react"
import CartContext from "./cart-context"



const defaultCartState = {
  items: [],
  totalAmount: 0
}

//state is last state, action is the dispatch by you
const cartReducer = (state, action) => {

  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )

    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState
}

const CartProvider = props => {

  //destructure
  //state , dispatch -> function that updates state
  //update/reducer function (outside of component), 2nd paramater is object
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
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }



  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}


export default CartProvider


