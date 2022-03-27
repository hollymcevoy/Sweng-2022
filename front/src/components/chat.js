
import React, { Component } from 'react';
import { Fab, Avatar, List, ListItem, ListItemIcon, ListItemText, ListItemButton  } from '@mui/material';
import { Typography, TextField, Divider, Grid, Paper, Collapse } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import axios from 'axios';
import SideBar from './chatbot/SideBarItem';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            documentsList : [],
            documentName: "",
            documentSource: "",
            message: '',
            user: '',
            bot: '',
            source: '',
            
        };
      }
      handleClick = () => {
        this.setState({ open: !this.state.open });
      };
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

      render() {
        return (
            <div>
              <Grid container>
                  <Grid item xs={12} >
                      <Typography variant="h5" className="header-message">Chat</Typography>
                  </Grid>
              </Grid>
              <Grid container component={Paper} style={{"width": "100%", "height": "80vh"}}>
                  <Grid item xs={3} style={{"borderRight":"1px solid #e0e0e0"}}>
                      <Typography variant="h6" className="header-message">Documents</Typography>
                      <Divider />
                      <Grid item xs={12} style={{padding: '10px'}}>
                          <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                      </Grid>
                      <Divider />
                        <SideBar documentsList={this.state.documentsList} handleChange={this.handleChange.bind(this)}/>
                        <List>
                                {this.state.documentsList.map((doc, key) => {
                                    return (
                                        <ListItem button key={key}>
                                            <ListItemText primary={doc.label} />
                                        </ListItem>
                                    )
                                })}
                        </List>

                  </Grid>
                  <Grid item xs={9}>
                      <List style={{"height":"70vh", "overflowY": "auto"}}>
                          <ListItem key="1">
                              <Grid container>
                                  <Grid item xs={12}>
                                      <ListItemText align="right" primary="What is an Algorithm?"></ListItemText>
                                  </Grid>
                              </Grid>
                          </ListItem>
                          <ListItem key="2">
                              <Grid container>
                                  <Grid item xs={12}>
                                      <ListItemText align="left" primary="An Algorithm process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer."></ListItemText>
                                  </Grid>
                              </Grid>
                          </ListItem>
                      </List>
                      <Divider />
                      <Grid container style={{padding: '20px'}}>
                          <Grid item xs={11}>
                              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                          </Grid>
                          <Grid xs={1} align="right">
                              <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
            </div>
        );
      } 
}

export default Chat;
