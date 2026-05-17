import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { counterActions } from "../model/slice/CounterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector(getCounterValue);

  const increment = () => {
    console.log(value);
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid="counter-title">{value}</h1>
      <br />
      <Button
        data-testid="increment-btn"
        onClick={increment}
        theme={ButtonTheme.OUTLINE}
      >
        increment
      </Button>
      <Button
        data-testid="decrement-btn"
        onClick={decrement}
        theme={ButtonTheme.OUTLINE}
      >
        decrement
      </Button>
    </div>
  );
};

export default Counter;
