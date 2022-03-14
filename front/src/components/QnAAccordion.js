import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Select from 'react-select';
import { qnadummy } from '../qnadummy';
import axios from 'axios';
class QnAAccordion extends Component {
  constructor(props){
    super(props)
    this.state = {
      documentsList : [],
      documentName: '',
      documentSource: [{label: 'comp sci', source:'comp.txt'}],
      qnas: [{question: 'what is the meaning of life?', answer: '42'}],
    }
  }
  componentDidMount(){
    this.getDocuments()
  }
  handleChange(e){
    this.setState({documentName:e.label, documentSource:e.source})
   }
  async getDocuments (){
    const response = await axios.get('http://localhost:3000/v1/documents');
    const documents = response.data.value;

    const documentsList = documents.reduce((res, doc) => {
      if(doc.displayName){
        res.push({label: doc.displayName, source:doc.source, sourceUri: doc.sourceUri});
      }
      return res;
    },[])

    this.setState({documentsList: documentsList})
  }
  async getQuestions (){
    const response = await axios.get('http://localhost:3000/v1/questions');
    const questions = response.questions;
    this.setState({questions: questions})
  }
  render() {
    return (
      <div>
        <Select options={this.state.documentsList} onChange={this.handleChange.bind(this)} />

        <Accordion className="Accordion" defaultActiveKey="0">
            <div>
              {this.state.qnas.map((data, key) => {
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