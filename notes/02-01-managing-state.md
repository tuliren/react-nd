# Managing State

- The goal is to make the state of the app more predictable, which is one of the best ways to improve the quality of the app.
- Redux is a predictable state container for JavaScript apps.
- Rules for increasing predictability of the state
  1. Only an event can change the state of the store.
  2. The function that returns the new state needs to be a pure function.

## Redux store
- State tree
  - All of the data is stored in a single object called the *state tree*.
- State operations
  - Getting the state
  - Listening for changes
  - Updating the state

## Action
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

## State update
- Pure function
  - Return the same result if the same arguments are passed in.
  - Depends solely on the arguments passed in to them.
  - Does not produce side effects.
- Components
  - Store: state tree and operations.
  - Action: events that will change the state of the store.
  - Reducer: a function that takes in the current state and an action, and returns the new store.

## Example

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

// App code

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
  return { type: ADD_TODO, todo };
}

function removeTodoAction(id) {
  return { type: REMOVE_TODO, id };
}

function toggleTodoAction(id) {
  return { type: TOGGLE_TODO, id };
}

function addGoalAction(goal) {
  return { type: ADD_GOAL, goal };
}

function removeGoalAction(id) {
  return { type: REMOVE_GOAL, id };
}

// todos reducer
function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id
      ? todo
      : Object.assign({}, todo, { complete: !todo.complete });
    default:
      return state;
  }
}

// goals reducer
function goals(state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

// root reducer
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = createStore(app);

// call unsubscribe() to unsubscribe
const unsubscribe = store.subscribe(() => {
  console.log('The new state is:', store.getState());
});

store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false,
}));
```
