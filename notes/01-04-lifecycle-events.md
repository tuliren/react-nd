# Lifecycle Events

## `render` is for rendering only
- `render` is only used for displaying content
- Data should not be fetched in the `render` method

## Lifecycle events
- Lifecycle events are specially names methods in a component
- These methods are automatically bound to the component instance
- React will call these methods naturally at certain times during the life of a component

| Method | Function |
| ---- | ---- |
| `componentDidMount` | Invoked immediateky *after* the component is *inserted* into the DOM |
| `componentWillUnmount` | Invoked immediately *before* a component is *removed* from the DOM |
| `getDerivedStateFromProps` | Invoked after a component is instantiated as well as when it receives brand new props |

### `componentDidMount`
- It is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
- If data needs to be loaded from a remote endpoint, this is a good place to instantiate the network request.

```js
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
    };
  }

  componentDidMount() {
    fetchUser().then((user) => this.setState({
      name: user.name,
      age: user.age,
    }));
  }

  render() {
    return (
      <div>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.state.age}</p>
      </div>
    );
  }
}
```

- The `render` method is called which updates the page with a `<div>`. `this.state.name` and `this.state.age` are empty strings (at first), so the name and age don't actually display.
- Once the component has been mounted, `componentDidMount` lifecycle event occurs:
  - `fetchUser` request from the `UserAPI` is run which sends a request to the user database;
  -  When the data is returned, `setState` updates the `name` and `age` properties.
- Since the state has changed, `render` gets called again. This re-renders the page, but now `this.state.name` and `this.state.age` have values.

### `componentWillMount`
- Do not use this event to fetch data.
- This event has been deprecated.
- More critically, React does not `await` for `componentWillMount`, and `async` function calls put in this event to fetch data will not return. So data won't be available in `render` method.

## Lifecycle event sequence

### Add component to the DOM
- `constructor`
- `getDerivedStateFromProps`
- `render`
- `componentDidMount`

### Re-render component to the DOM
- `getDerivedStateFromProps`
- `shouldComponentUpdate`
- `render`
- `getSnapshotBeforeUpdate`
- `componentDidUpdate`

### Remove component from the DOM |
- `componentWillUnmount`
