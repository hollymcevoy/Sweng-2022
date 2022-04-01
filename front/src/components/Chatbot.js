import { DirectLine } from 'botframework-directlinejs';
import React, { Component } from 'react';
import ReactWebChat from 'botframework-webchat';
import Card from 'react-bootstrap/Card';

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.directLine = new DirectLine({ token: "token" });
  }

  render() {
    return (
      <Card className="Chatbot">
        <Card.Body>
          <ReactWebChat
            directLine={ this.directLine }
            user={{id:'User'}}
            />
        </Card.Body>
      </Card>
    );
  }
}

export default Chatbot;