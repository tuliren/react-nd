# Asynchronous Redux

- In real world, data is often fetched asynchronously from an external data source.

## Example
- [Redux with external data](../todos-goals/index-async.html)

## Data loading
- Add a new data loading action.
- Build a new reducer.
- Render a UI for data loading stage.

```js
function loading(state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
}

class App extends React.Component {
  render() {
    const { store } = this.props;
    const { todos, goals, loading } = store.getState();

    if (loading) {
      return (<h3>Loading</h3>);
    }

    return (
      <div>
        <Todos todos={todos} store={this.props.store}/>
        <Goals goals={goals} store={this.props.store}/>
      </div>
    );
  }
}
```

## Optimistic updates
- When dealing with asynchronous requests, there will always be some delay involved.
- If the UI waits for the confirmation from the server, user would would have to wait for some time to see that update in the UI, which is not the best experience.
- **Optimistic updates** is a technique that provides instant feedback on the UI while waiting for the response from the server. If the server responds back with an error, add the information back in.

```js
// normal updates
const removeItem = (todo) => {
  return API.deleteTodo(todo.id)
    .then(() => {
      // user will experience delay
      this.props.store.dispatch(removeTodoAction(todo.id));
    });
};

// with optimistic updates
const removeItem = (todo) => {
  // update the UI immediately
  this.props.store.dispatch(removeTodoAction(todo.id));
  return API.deleteTodo(todo.id)
    .catch(() => {
      // if there is any error, add the todo back
      this.props.store.dispatch(addTodoAction(todo));
      alert('An error occurred. Try again.');
    });
};
```

## Thunk
- Current code mixes UI logic with the data retrieval logic.
- This is because out of the box, the Redux store can only support the synchronous flow of data.
- Middleware like `thunk` helps support asynchronicity in a Redux app. 
- `thunk` can be thought of as a wrapper for the store’s `dispatch()` method.
- Rather than returning action objects, `thunk` action creators are used to dispatch functions (or even or `Promise`s).
- Benefits of `thunk`:
  - Cleaner separation of concerns. Components don't need to handle what happens after an asynchronous call, since API logic is moved away from components to action creators.
  - Greater predictability. Action creators will become the source of every change in state. With thunks, an action can be dispatched only when the server request is resolved.

## Readings
- [Dispatching Redux Actions with a Timeout](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)
- [Async Flow](https://redux.js.org/advanced/async-flow)
- [Understanding how redux-thunk works](https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50)

## More asynchronous options
- [Redux Promise](https://github.com/redux-utilities/redux-promise) - FSA-compliant promise middleware for Redux.
- [Redux Saga](https://github.com/redux-saga/redux-saga) - An alternative side effect model for Redux apps
