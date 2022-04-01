// react components

import React, { Component } from 'react';
import { List, ListItem,  Collapse, ListItemText, ListItemButton  } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
class SideBar extends Component {
    // accept props from parent component
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            documentsList : [{label: "Computer Science", source: "https://www.google.com"}, {label: "Computer Science", source: "https://www.google.com"}],
            documentName: "",
            documentSource: "",
            message: '',
        };
    }
    handleClick = () => {
        this.setState({ open: !this.state.open });
      };
    render() {
        return (
            <div>
                <List>
                    {this.state.documentsList.map((doc, key) => {
                        return (
                            <div>
                                <ListItemButton onClick={this.handleClick}>
                                    <ListItemText primary="Computer Science" />
                                    <ListItemText secondary="See Questions" align="right"></ListItemText>
                                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Question 1" />
                                    </ListItemButton>
                                    </List>
                                </Collapse>
                            </div>
                            )
                        })}
                </List>
            </div> 
        );
    }
}
export default SideBar;