import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <div style={{
        textAlign: 'center',
      }}>
        <h3>404 - Not found</h3>
        <p>Go back to <Link to='/'>main page</Link></p>
      </div>
    );
  }
}

export default NoMatch;
