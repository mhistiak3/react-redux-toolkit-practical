import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "../store/reducers/counter.slice";
import { useState } from "react";
const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;
  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Counter
        </h1>
        <div className="text-6xl font-extrabold text-indigo-600 mb-8 text-center">
          {count}
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            className="px-5 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            className="px-5 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <label className="text-lg font-medium mb-2 text-gray-600">
            Increment By Amount
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={() => dispatch(incrementByAmount(addValue))}
            >
              Add Value
            </button>
          </div>
        </div>

        <button
          className="px-5 py-3 w-full bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={resetAll}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
