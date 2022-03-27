// react components

import React, { Component } from 'react';
import { List,  Collapse, ListItemText, ListItemButton  } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
class SideBar extends Component {

    render() {
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
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
                </div> 
        );
    }
}
export default SideBar;