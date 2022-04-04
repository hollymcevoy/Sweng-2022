
import React, { Component } from 'react';
import { Fab,  List, ListItem,  ListItemText,  IconButton } from '@mui/material';
import { Typography, TextField, Divider, Grid, Paper} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';
import SideBar from './chatbot/SideBarItem';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            documentsList : [],
            documentName: "SwengQNA",
            documentSource: "https://www.google.com",
            message: '',
            user: '',
            bot: '',
            source: '',
            messages: [],
            qnaId: 0,
            userId: 0,
            recentQuestion: {},

            
        };
      }
      handleClick = () => {
        this.setState({ open: !this.state.open });
      };
      async sendMessage(){
        const message = { 
            "text": this.state.message,
            "type": "user"
        }
        this.setState({message: ""});
        this.setState({messages: [...this.state.messages, message]});

        const response = await axios.post('https://sweng-api-node.azurewebsites.net/v1/questions', {
            question: message.text,
            docName: 'SwengQNA'
        }); 
        this.setState({recentQuestion: message});
        this.setState({qnaId: response.data.answers[0].id});
        this.setState({userId: 'shevlin'});
        let botMessage = {
            'text': '',
            "shortAnswer": '',
            "longAnswer": '',
            "type": "bot"
        }
        try{
            botMessage.shortAnswer = response.data.answers[0].answerSpan.text;
        }catch(e){
            console.log(e);
        }
        try{
            botMessage.longAnswer = response.data.answers[0].answer;
        }catch(e){
            console.log(e);
        }
        if(botMessage.shortAnswer === ''){
            botMessage.text = botMessage.longAnswer;
        } else {
            botMessage.text = botMessage.shortAnswer;
        }
        this.setState({messages: [...this.state.messages, botMessage]});



      };
      async addFeedback(){
        console.log(this.state.qnaId, this.state.userId, this.state.recentQuestion.text);
        const response = await axios.post('https://sweng-api-node.azurewebsites.net/v1/questions/feedback', {
            qnaId: this.state.qnaId,
            userId: this.state.userId,
            question: this.state.recentQuestion.text,
            feedback: this.state.source
        });
        console.log(response);

      }
      componentDidMount(){
        this.getDocuments()
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

      render() {
        return (
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5" className="header-message">
                  Chat
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              component={Paper}
              style={{ width: "100%", height: "100%" }}
            >
              <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
                <Typography variant="h6" className="header-message">
                  Documents
                </Typography>
                <Divider />
                <Grid item xs={12} style={{ padding: "10px" }}>
                  <TextField
                    id="outlined-basic-email"
                    label="Search"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Divider />
                <SideBar />
              </Grid>
              <Grid item xs={9}>
                <List style={{ height: "70vh", overflowY: "auto" }}>
                  {this.state.messages.map((message, key) => {
                    return (
                      <ListItem key={key}>
                        <Grid container>
                          <Grid item xs={12}>
                            {message.type === "bot" ? (
                              <ListItemText
                                primary={message.text}
                                style={{ textAlign: "left" }}
                              />
                            ) : (
                              <ListItemText
                                primary={message.text}
                                style={{ textAlign: "right" }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                  })}
                </List>

                <Divider />

                <Grid container style={{ padding: "20px" }}>
                  <Grid item>
                    <IconButton aria-label="delete">
                      <ThumbUpIcon
                        color="success"
                        onClick={() => this.addFeedback()}
                      />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <ThumbDownIcon
                        color="error"
                        onClick={() => this.addFeedback()}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs={11} md={10}>
                    <TextField
                      id="outlined-basic-email"
                      label="Message"
                      variant="outlined"
                      fullWidth
                      value={this.state.message}
                      onChange={(e) =>
                        this.setState({ message: e.target.value })
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          this.sendMessage();
                        }
                      }}
                    />
                  </Grid>
                  <Grid xs={1} align="right">
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={() => this.sendMessage()}
                    >
                      <SendIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      } 
}

export default Chat;
