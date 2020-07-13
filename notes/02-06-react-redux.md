# `react-redux`

## Example
- [React with context](../todos-goals/index-context.html)
- [React redux](../todos-goals/index-react-redux.html)

## Access store in component
- Passing data from one component to another component was cumbersome.

```js
import React from 'react';
import { render } from 'react-dom';

function Parent ({ name }) {
  return (
    <div>
      <h1>Parent</h1>
      <Child name={name}/>
    </div>
  );
}

function Child ({ name }) {
  return (
    <div>
      <h1>Child</h1>
      <Grandchild name={name}/>
    </div>
  );
}

function Grandchild ({ name }) {
  return (
    <div>
      <h1>Grandchild</h1>
      <h3>Name: {name}</h3>
    </div>
  );
}

class App extends React.Component {
  render() {
    const name = 'Tyler';

    return (
      <Parent name={name} />
    );
  }
}

render(<App />, document.getElementById('root'));
```

## `Context`

```js
const Context = React.createContext();
```

### `Context.Provider`
- The Provider component is used in the upper level of the component tree, the component from which the data to be passed is held.

```js
class App extends React.Component {
  render() {
  const name = 'Tyler';

  return (
    <Context.Provider value={name}>
      <Parent />
    </Context.Provider>
    );
  }
}
```

### `Context.Consumer`
- `Consumer` is passed a function. This function accepts a value and returns the view.

```js
function Grandchild ({ name }) {
  return (
    <Context.Consumer>
      {(name) => (
        <div>
          <h1>Grandchild</h1>
          <h3>Name: {name}</h3>
        </div>
      )}
    </Context.Consumer>
  );
}
```

- Container (connected) components
  - Connected to the Redux store
  - Responsible for interacting with the store (how things work)
- Presentation components
  - Should not access the store, but receive information as props
  - Responsible for rendering content (how things look)

```js
// container component: ConnectedApp
// presentation components: App

class ConnectedApp extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {(store) => (
          <App store={store} />
        )}
      </Context.Consumer>
    );
  }
}
```

### `connect` function
- `Context.Consumer` does two things:
  - Render a component
  - Pass that component any data it needs from the store
- It can be abstracted away by the `connect` function.

```js
const ConnectedApp = connect((store) => ({
  loading: store.loading
}))(App);
```

## `react-redux` bindings

### `Provider`
- `Provider` makes it possible for Redux to pass data from the store to any React components that need it. It uses React’s context feature.

```js
<ReactRedux.Provider store={store}>
<ConnectedApp />
</ReactRedux.Provider>
```
  
### `connect()`
- `connect` connects a React component to the Redux store.
- It takes in two arguments and returns a function.
- `mapStateToProps()` function specifies which state from the store to pass to the React component
- `mapDispatchToProps()` function binds dispatch to action creators before they ever hit the component.

```js
const buildConnectedComponent = connect(mapStateToProps, mapDispatchToProps);
const ConnectedComponent = buildConnectedComponent(MyComponent);
  
// combine into one statement
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```
  
- `ConnectedComponent` renders `MyComponent`, passing it the `props` as defined by `mapStateToProps` and `mapDispatchToPros`.

## Folder structure
- Rails-style organization.
  - Assets are grouped by "type" or "capability".
  - Any action will be found in the Actions folder, any reducer will be found in Reducers, and so on.

    ```
    Frontend
      - Components
        - component1.js
        - component2.js
        - component3.js
      - Actions
        - action1.js
        - action2.js
      - Reducers
        - reducer1.js
      - Util
      - Store
    ```
- Organization by feature
  - Assets related to a navigation component are all together in a single, modular folder.
  - If the app contains several hundred components, it can become difficult to navigate through.

- Duck style
  - Redux and state management files are completely separated from files that render UI.

## Readings
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
