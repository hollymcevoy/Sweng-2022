import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import giphy from '../images/giphy.gif'


class Loader extends Component {
  render() {
    return (
      <div>
        <img className="App-load-image"  src={giphy}></img>
        <p className="App-Page-Header">Loading . . .</p>
      </div>
    );
  }
}

export default Loader;