import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { qnadummy } from "../qnadummy";

class QnAAccordion extends Component {
  render() {
    return (
      <div>

      <Accordion className="Accordion" defaultActiveKey="0">
        <div>
          {qnadummy.map((data, key) => {
            return (
              <div key={key}>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={key+1}>
                      {data.que}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={key+1}>
                    <Card.Body>{data.ans}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </div>
            );
          })}
        </div>
      </Accordion>


      </div>
    );
  }
}

export default QnAAccordion;