# State Management

## Introduction
- Props: pass data into components
- Functional components: an alternative, and more intuitive approach to creating components
- Controlled components: hook up the forms in application to state

## `props`
- A prop is any input that is passed to a React component.
- Just like an HTML attribute, a prop name and value are added to the Component.
- Passed in data is accessible through `this.props.<variable>`

```js
class User extends React.Component {
  render() {
    return (
      <p>Username: {this.props.username}</p>
    );
  }
}

<User username='Tyler'/>
```

## Functional components
- If no internal state is needed, a component can be declared as a Stateless Functional Component.
- It is equivalent to a normal component with just the `render` method.
- The `props` are passed into a functional component as its parameter.

```js
function User(props) {
  return (
    <p>Username: {props.username}</p>
  );
}
```

## `state`
- `props` represents *immutable* data.
- `state` represents *mutable* data.
- `state` is managed internally by the component.

```js
class User extends Component {
  state = {
    username: 'Tyler',
  };
  render() {
    return (
      <p>Username: ${this.state.username}</p>
    );
  }
}
```

- The UI is simply a function of the application state.
- Application concern:
  - Which state is in the application?
  - How does the UI change based off of the state?
- `state` is a class field, and lives outside the `constructor()` method.
  - It is not supported by JavaScript yet, but it is transpiled by Babel.


## Props in initial state anti-pattern
- Do not initialize `state` with `props`.

```js
// anti-pattern
this.state = {
  user: props.user,
};
```

- If `props` is updated, `state` won't change unless the component is refreshed.
- Data is duplicated.

## Reconciliation
- Any time `state` is changed, React will know and automatically update the page.
- Reconciliation is the process of determining what has changed in the previous and new outputs.

## Update `state`
- Use `setState` to update `state`.
- Re;act will know the change and call `render` to re-render the component.
- Two ways to use this function.
  - Pass in an object with the new value for the property to be updated. This object will be merged to the `state`.
  - Pass in a function and update the property based on previous `state` and `props`. The return value of this function will be merged to the `state`.

```js
class Email extends Component {
 state = {
   count: 1,
 };
};

// approach one
this.setState({
  count: 2,
})

// approach two
this.setState((prevState, props) => {
  count: prevState.count + 1,
});
```

## Type checking with `PropTypes`
- `PropTypes` is a package that provides type definition for `props`
- It warns about mismatched `prop` properties passed into a component

```sh
# npm
npm install --save prop-types

# yarn
yarn add prop-types
```

```js
import PropTypes from 'prop-types'

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}
```

## Controlled components
- Components that render a form, but the "source of truth" for that form state lives inside of the component state rather than inside of the DOM
- It controls what happens in that form based on user input
- Benefits of controlled components:
  - Instant input validation
  - Conditionally disable/enable buttons
  - Enforce input formats

```js
class NameForm extends Component {
  state = { email: '' };

  // react is in control of the email property
  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
```
