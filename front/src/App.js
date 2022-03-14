import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './views/Home';
import About from './views/About';
import Upload from './views/Upload';
import QnAKB from './views/QnAKB';
import Chatbot from './views/Chatbot';
import Account from './views/Account'
import Footer from './components/Footer';
import AddQuestion from './components/AddQuestion';

import {
  Route,
  Routes,
} from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div> 
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/home"  element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/knowledgebase" element={<QnAKB />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} /> 
              <Route path="/editknowledgebase" element={<AddQuestion />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
