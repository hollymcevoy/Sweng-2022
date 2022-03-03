import microsoft_logo from '../images/microsoft_logo.png'; 
import tcd_logo from '../images/tcd_logo.jpeg';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../styles/Footer.css';


class Footer extends Component {
  

    render() {
        return (
            <div className="App-footer">
                <span className="Text" >Made by students in Trinity College Dublin in collaboration with Microsoft Ireland </span>
                <br></br>
                    <img className="App-footer-image" src={tcd_logo} alt="tcd_logo" />
                    <img className="App-footer-image" src={microsoft_logo} alt="microsoft_logo" />
            </div>
                
                
            
        );
    }

}

export default Footer;

