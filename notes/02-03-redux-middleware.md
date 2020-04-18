# Redux Middleware

- Redux middleware is a third-party extension point between dispatching an action, and the moment it reaches the reducer.
- Middle is the recommended way to extend Redux with custom functionality.
- Typical operations performed in middleware:
  - Producing a side effect (e.g. logging information about the store)
  - Processing the action itself (e.g. making an asynchronous HTTP request)
  - Redirecting the action (e.g. to another piece of middleware)
  - Dispatching supplementary actions

```js
const middlewareFunction = (store) => (next) => (action) => {
  // process action
  // run next middleware function
  return next(action):
};

const store = Redux.createStore(
  Redux.combineReducers({ ...reducers }),
  Redux.applyMiddleware(...middlewares),
);
```

- `middlewareFunction` is run between `store.dispatch()` and the reducer.

## Readings
- [Middleware Docs](https://redux.js.org/advanced/middleware)
- [API for Redux's Middleware](https://redux.js.org/api/applymiddleware)
