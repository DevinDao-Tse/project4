import React, { useState, useRef } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'


const MealItemForm = props => {

  const [amountIsValid, setAmountIsValid] = useState(true)

  const amountInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountInput = +enteredAmount



    if (enteredAmount.trim().length === 0 ||
      enteredAmountInput < 1 ||
      enteredAmountInput > 5) {
      setAmountIsValid(false)
      return
    }

    props.onAddToCart(enteredAmountInput)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }} />
      <button> Add + </button>
      {!amountIsValid && <p>Enter a valid amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm