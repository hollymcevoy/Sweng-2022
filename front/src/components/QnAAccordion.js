import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Select from 'react-select';
import { qnadummy } from '../qnadummy';

class QnAAccordion extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      name: '',
      qna: []
    }
  }
  componentDidMount(){
    this.getOptions()
  }
  handleChange(e){
    this.setState({qna:e.qnaval, name:e.label})
   }
  async getOptions(){
    const options = qnadummy.map(d => ({
      "label" : d.name,
      "qnaval" : d.qna
    }))
    this.setState({selectOptions: options})
  }
  render() {
    return (
      <div>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />

        <Accordion className="Accordion" defaultActiveKey="0">
            <div>
              {this.state.qna.map((data, key) => {
                return (
                  <div key={key}>
                    <Accordion.Item eventKey={key+1}>
                      <Accordion.Header>
                        {data.question}
                      </Accordion.Header>
                          
                      <Accordion.Body>
                      {data.answer}
                      </Accordion.Body>
                    </Accordion.Item>
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