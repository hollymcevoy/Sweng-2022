
import React, { Component } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Grid, Box, Card, CardContent, CardActions, Button, Typography, CardActionArea } from '@mui/material';
class QnAAccordion extends Component {
  constructor(props){
    super(props)
    this.state = {
      documentsList : [],
      documentName: '',
      documentSource: [{label: 'comp sci', source:'comp.txt'}],
      qnas: [{question: 'what is the meaning of life?', answer: '42'}, {question: 'what is the meaning of life?', answer: '42'}],
    }
  }
  componentDidMount(){
    this.getDocuments()
    this.getQuestions()
  }
  handleChange(e){
    this.setState({documentName:e.label, documentSource:e.source})
   }
  async getDocuments (){
    const response = await axios.get('https://sweng-api-node.azurewebsites.net/v1/documents');
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
    const docName = this.state.documentName;
    console.log(docName)
    const response = await axios.get(`https://sweng-api-node.azurewebsites.net/v1/questions?docName=SwengQNA`);
    const questions = response.data.question;
    this.setState({questions: questions})
  }
  render() {
    return (
      <div>
          <Grid container  alignItems="center" style={{marginTop: "10vh"}}>
            <Box m="auto" >
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'grey.100',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}>
                <ListSubheader>
                  <Typography variant="h6">
                    QnA
                  </Typography>
                </ListSubheader>
                {this.state.qnas.map((data, key) => {
                  return (
                    <ListItem key={key}>
                      <ListItemText primary={data.question} secondary={data.answer} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
      </div>
    );
  }
}

export default QnAAccordion;