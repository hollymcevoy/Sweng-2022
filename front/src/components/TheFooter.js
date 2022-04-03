import * as React from 'react';
import tcd_logo from '../images/tcd_logo.jpeg';
import microsoft_logo from '../images/microsoft_logo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="body1" color="inherit">
                    Made by students in Trinity College Dublin in collaboration with Microsoft Ireland
                </Typography>
                <img src={tcd_logo} alt="tcd_logo" style={{width: '150px', margin: '10px'}} />
                <img src={microsoft_logo} alt="microsoft_logo" style={{width: '150px', margin: '10px'}} />

            </Toolbar>
        </AppBar>
    );
}
export default Footer;