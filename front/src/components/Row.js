// react components

import React, { Component } from 'react';

import Box from '@mui/material/Box';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            row: props.row
            
        };
    }
    setOpen(){
        this.setState({
            open: !this.state.open
        })
    }
    
    render() {

        return (
            <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => this.setOpen()}
            >
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {this.state.row.source}
          </TableCell>
          <TableCell align="right">{this.state.row.sourceName}</TableCell>
          <TableCell align="right">{this.state.row.unstructured}</TableCell>
          <TableCell align="right">{this.state.row.sourceType}</TableCell>
          <TableCell align="right">{this.state.row.questions}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Questions
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell>Answer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {this.state.row.history.map((questionRow) => (
                          <TableRow key={questionRow.question}>
                              <TableCell component="th" scope="row">
                                  {questionRow.question}
                              </TableCell>
                              <TableCell align="left">{questionRow.answer}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
        );
    }
}
export default Row;