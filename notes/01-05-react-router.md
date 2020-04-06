# React Router

## Single-page apps
- Difference approaches
  - Download the entire site's contents all at once.
  - Download everything that's needed to render the page the user requested. When the user navigates to a new page, asynchronous JavaScript requests are made for just the requested content.
- URL controls the page content for bookmarkability.

## React router
- React router is a collection of navigational components that compose declaratively with the application.
- It turns React projects into single-page applications.
- It provides specialized components to:
  - Manage the creation of links
  - Manage the app's URL
  - Provide transitions between different URL locations

## Install `react-router-dom`

```sh
// npm
npm install --save react-router-dom

// yarn
yarn add react-router-dom
```

## `BrowserRouter` component
- Listen to changes in the URL
- Ensure the correct screen shows up whenever the URL changes
- Update `index.js` and wrap `App` inside `BrowserRouter`

  ```js
  // index.js
  ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
    document.getElementById('root'),
  );
  ```

- `BrowserRouter` source code

  ```js
  class BrowserRouter extends React.Component {
    static propTypes = {
      basename: PropTypes.string,
      forceRefresh: PropTypes.bool,
      getUserConfirmation: PropTypes.func,
      keyLength: PropTypes.number,
      children: PropTypes.node
    }
  
    history = createHistory(this.props)
  
    render() {
      return <Router history={this.history} children={this.props.children} />
    }
  }
  ```

## `Link` component
- When user clicks a `Link`, it tasks to the `BrowserRouter` about the URL update
- Replace `a` element with `Link` component:

  ```js
  // simple link
  <Link to='/create'>Add Contact</Link>

  // complicated link
  <Link to=\{{
    pathname: '/courses',
    search: '?sort=name',
    hash: '#the-hash',
    state: { fromDashboard: true }
  }}>
    Course
  </Link>
  ```

## `Route` component
- `Route` component decides which components to render based on the current URL path.

  ```js
  // render function
  <Route exact path='/' render={() => (
    <content-to-render-under-this-path>
  )} />

  // render component
  <Route path='/create' component={CreateComponent}/>
  ```

- Without `exact`, path `/` can match `/create` as well
- Push new path to `history` in `render` function to trigger a redirect:

  ```js
  <Route path='/create' render={({ history }) => (
    <CreateContact
      onCreateContact={(contact) => {
        this.createContact(contact);
        // redirect after calling the above function
        history.push('/');
      }}
    />
  )}/>
  ```

## Readings
- [React router documentation](https://reacttraining.com/react-router/web/guides/philosophy)
- [Build your own React Router v4](https://tylermcginnis.com/build-your-own-react-router-v4/)
- [Nested routes with React Router](https://tylermcginnis.com/react-router-nested-routes/)
