# Managing State
- The goal is to make the state of the app more predictable, which is one of the best ways to improve the quality of the app.
- Redux is a predictable state container for JavaScript apps.
- Rules for increasing predictability of the state
  1. Only an event can change the state of the store.
  2. The function that returns the new state needs to be a pure function.
- Redux store
  - State tree
    - All of the data is stored in a single object called the *state tree*.
  - State operations
    - Getting the state
    - Listening for changes
    - Updating the state

## The Store

### Action
- An action is a plain JavaScript object.
- Each action has a type property to let Redux know exactly what event just took place.
- Pass as little data as possible in each action.
- Action creators are functions that create/return action objects.

```js
const addItem = item => ({
  type: ADD_ITEM,
  item
});
```

### State update
- Pure function
  - Return the same result if the same arguments are passed in.
  - Depends solely on the arguments passed in to them.
  - Does not produce side effects.
- Components
  - Store: state tree and operations.
  - Action: events that will change the state of the store.
  - Reducer: a function that takes in the current state and an action, and returns the new store.


```js
// Library code
function createStore(reducer) {
  let state = {};
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    // return a function to unsubscribe the listener
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  }
}

// App code: reducer function
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  }
  return state;
}

const store = createStore(todos);
// call unsubscribe1() to unsubscribe
const unsubscribe1 = store.subscribe(() => {
  console.log('The new state is:', store.getState());
});
// call unsubscribe2() to unsubscribe
const unsubscribe2 = store.subscribe(() => {
  console.log('The store changed.');
});
```

