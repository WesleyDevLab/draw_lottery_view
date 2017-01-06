import React from 'react'
import { Button } from 'antd'

export const Counter = (props) => (
  <div style={{
    margin: '0 auto'
  }}>
    <h2>Counter: {props.counter}</h2>
    <Button type='primary' onClick={props.increment}>
      Increment
    </Button>
    {' '}
    <Button  type='primary' onClick={props.doubleAsync}>
      Double (Async)
    </Button>
  </div>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
