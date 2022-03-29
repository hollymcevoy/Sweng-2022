import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Welcome extends Component {
  render() {
    return (
      <div>
        
        <Card className="text-center">
          <Card.Body>
          <p>Try uploading a document to your knowledge base!</p>
          </Card.Body>
        </Card>

      </div>
    );
  }
}

export default Welcome;