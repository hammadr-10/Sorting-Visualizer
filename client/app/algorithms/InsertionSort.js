import { setArray } from "../reducers/array";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function insertionSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  let finalArray = insertionSortHelper(array.map((num, idx) => [num, idx]), toDispatch, {array: array.slice(0)});
  handleDispatch(toDispatch, dispatch, finalArray, speed);
}

function insertionSortHelper(array, toDispatch, obj) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j][0] > key[0]) {
      array[j + 1] = array[j];
      toDispatch.push([j, j + 1]);
      j = j - 1;
    }
    array[j + 1] = key;
  }
  obj.array = array.map(subArr => subArr[0]);
  return array;
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentSorted(array.map((num, index) => index)));
    dispatch(setRunning(false));
    return;
  }
  let dispatchFunction = toDispatch[0].length > 2 ? setArray : setCurrentSwappers;
  if (dispatchFunction === setArray) {
    let currentToDispatch = toDispatch.shift();
    dispatch(dispatchFunction(currentToDispatch));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentSwappers([currentToDispatch[0], currentToDispatch[1]]));
  } else {
    dispatch(dispatchFunction(toDispatch.shift()));
  }
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default insertionSort;
