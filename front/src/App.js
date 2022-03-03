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




import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div> 
        <div className="App-body">
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route path="/upload" component={Upload} />
            <Route path="/qnakb" component={QnAKB} />
            <Route path="/chatbot" component={Chatbot} />
            <Route path="/about" component={About} />
            <Route path="/Account" component={Account} /> 
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
