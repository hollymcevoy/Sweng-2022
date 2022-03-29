import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import upload from '../images/upload.png'
import qna from '../images/qna.png'
import chatbot from '../images/chatbot.png'

class Welcome extends Component {
  render() {
    return (
      <div className="App-feature">
       <Carousel>
        <Carousel.Item>   
        <img
            className="App-feature-image"
            src={upload}
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Upload documents</h3>
            <p>In order to query a document it needs to be uploaded.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="App-feature-image"
            src={qna}
            alt="Image One"
          />

          <Carousel.Caption>
            <h3>Access your knowledge base</h3>
            <p>All questions and answers to uploaded documents in one spot.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="App-feature-image"
            src={chatbot}
            alt="Image One"
          />

          <Carousel.Caption>
            <h3>Query the Chatbot</h3>
            <p>The chatbot will use the knowledge base to get answers to your specific questions.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      </div>
    );
  }
}

export default Welcome;