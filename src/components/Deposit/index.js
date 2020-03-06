import React, { useState } from 'react'

const Deposit = () => {
  const [amount, setAmount] = useState('')
  return (
    <div>
      <h1>Enter Amount</h1>
      <form>
        <input
          type="number"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Deposit
