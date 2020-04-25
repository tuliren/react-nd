# `react-redux`

## Access store in component
- Passing data from one component to another component was cumbersome.

### `Context`
- 

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

## Readings
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
