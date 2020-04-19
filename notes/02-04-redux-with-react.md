# Redux with React
- Redux can be integrated into any UI:
  - React apps
  - Vue apps
  - Plain HTML apps
  - Vanilla JavaScript apps
- Connect Redux with React by passing the store in `props`.

## Example
- [Redux with React UI](../todos-goals/index-react.html)

## [`ref`](https://reactjs.org/docs/refs-and-the-dom.html)
- Refs provide a way to access DOM nodes or React elements created in the render method.
- When to use Refs
  - Managing focus, text selection, or media playback.
  - Triggering imperative animations.
  - Integrating with third-party DOM libraries.
- React will call the `ref` callback with the DOM element when the component mounts, and call it with `null` when it unmounts.
- Refs are guaranteed to be up-to-date before `componentDidMount` or `componentDidUpdate` fires.

```js
class Color extends React.Component {
  alertTextInput = e => {
    e.preventDefault();
    alert(this.colorElement.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Add Input"
          ref={(inputElement) => this.colorElement = inputElement}
        />

        <button onClick={this.alertTextInput}>Alert Input</button>
      </div>
    );
  }
}
```

- `inputElement` is a reference to the `input` DOM element.
- `this.colorElement = inputElement` stores a reference to the `input` DOM element in the `colorElement` instance property of the `Color` class.

## `forceUpdate`

- Call `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`.
- This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child.
- React will still only update the DOM if the markup changes.

```js
class App extends React.Component {
  componentDidMount () {
    const { store } = this.props
    // whenever there is a change in store,
    // use forceUpdate to trigger a re-render
    store.subscribe(() => this.forceUpdate())
  }
  render() {
    const { store } = this.props
    const { todos, goals } = store.getState()

    return (
      <div>
        <Todos todos={todos} store={this.props.store} />
        <Goals goals={goals} store={this.props.store} />
      </div>
    )
  }
}
```

## Readings
- [Component State vs Redux Store](https://medium.com/netscape/component-state-vs-redux-store-1eb0c929277)
- [React + Redux Architecture : Separation of Concerns]()
