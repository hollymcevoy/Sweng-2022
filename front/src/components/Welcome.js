import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Welcome extends Component {
  render() {
    return (
      <div>
        <p className="App-Page-Header">Welcome to QueryBot22</p>
        <Card className="text-center">
          <Card.Body>
          <p>This is an application that will take in unstructured data and convert it into questions and answers. These can be seen on the knowledge base tab once you upload your first document! You can also query the chatbot for a faster result.</p>
          </Card.Body>
        </Card>

      </div>
    );
  }
}

export default Welcome;