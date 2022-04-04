import React, { Component } from 'react';


import Home from './views/Home';
import About from './views/About';
import Upload from './views/Upload';
import Chatbot from './views/Chatbot';
import Account from './views/Account2';
import AddQuestion from './components/AddQuestion';
import { ProtectedRoute } from './components/ProtectedRoute';
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
            <Route path="/upload" element={<ProtectedRoute component={Upload} />} />
            <Route path="/chatbot" element={<Chatbot/>} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<ProtectedRoute component={Account} />} />
            <Route path="/editknowledgebase" element={<ProtectedRoute component={AddQuestion} />} />
          </Routes>
        </div>
      </div>
    );
  }
  
}

 export default App;


