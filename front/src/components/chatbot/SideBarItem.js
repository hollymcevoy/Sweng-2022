// react components

import React, { Component } from 'react';
import { List, ListItem,  Collapse, ListItemText, ListItemButton  } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            documentsList : [{label: "Intro to Rust", source: "https://www.google.com"}, {label: "Functions in rust", source: "https://www.google.com"}],
            documentName: "",
            documentSource: "",
            message: '',
        };
    }
    async getDocumentList(){
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
    componentDidMount(){
        this.getDocumentList();
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
      };
    render() {
        return (
            <div>
                <List>
                    {this.state.documentsList.map((doc, key) => {
                        if(key > 3){
                            return (
                                <div>
                                    <ListItemButton onClick={this.handleClick}>
                                        <ListItemText primary={doc.label} />
                                    </ListItemButton>
                                </div>
                                )
                            }

                        })}
                </List>
            </div> 
        );
    }
}
export default SideBar;