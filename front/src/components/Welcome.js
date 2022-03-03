import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Welcome extends Component {
  render() {
    return (
      <div>
        <p>Welcome Component</p>
        <Button href="/about">Learn More</Button> {' '}

      </div>
    );
  }
}

export default Welcome;