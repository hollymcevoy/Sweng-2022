import React, {Component} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import axios from 'axios';
import NavBar from '../components/TheNavbar';
import Footer from '../components/TheFooter';
import Row from '../components/Row';
class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []

            
        };
    }
    async getQuestions(source){
        const response = await axios.get('https://sweng-api-node.azurewebsites.net/v1/documents/qnas', {
            params: {
                source: source
            }
        });
        return response.data;
    }
    async getDocuments (){
        const response = await axios.get('https://sweng-api-node.azurewebsites.net/v1/documents');
        const documents = response.data.value;
        // Add the documents to the state in row
        const rows = [];
        for (const d in documents) {
            const questions = await this.getQuestions(documents[d].source);
            rows.push(this.createData(documents[d].source, documents[d].displayName, documents[d].contentStructureKind, documents[d].sourceKind, questions ));
        }
        this.setState({rows: rows});
        
      }
    componentDidMount(){
        this.getDocuments()
    }
    createData(source, sourceName, unstructured, sourceType, questions) {
    //    turn questions in to an array of objects with the question and answer
    const qna = [];
    for (const q in questions.value) {
        qna.push({
            question: questions.value[q].questions[0]|| 'no questions detected',
            answer: questions.value[q].answer || 'no answer detected'
        })
    }
        return {
          source,
          sourceName,
          unstructured,
          sourceType,
          history: qna
        };
      }
    render() {
        return (
            <div>
                <NavBar />
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                      <TableHead>
                      <TableRow>
                          <TableCell />
                          <TableCell>Source</TableCell>
                          <TableCell align="right">Source Name</TableCell>
                          <TableCell align="right">Document format</TableCell>
                          <TableCell align="right">Document Type</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {this.state.rows.map((row) => (
                          <Row key={row.name} row={row} />
                      ))}
                      </TableBody>
                  </Table>
                  </TableContainer>
                  
              <Footer />
            </div>
          
        );
    }
    
}

export default Questions;