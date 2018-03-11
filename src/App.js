import React, { Component } from 'react';
import Navigation from "./Navigation";
import Author from "./Author";
import Book from "./Book";
import Login from "./Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
  render() {
      return (
          <BrowserRouter>
              <div>
                  <Navigation/>
                  <Switch>
                      <Route path='/authors' component={Author}/>
                      <Route path='/books' component={Book}/>
                      <Route path='/login' component={Login}/>
                      <Route render={() => <h1>Page not found</h1>}/>
                  </Switch>
              </div>
          </BrowserRouter>
      );
  }
    clickMeMethod = () => {
        this.setState({
            open: true,
        });
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
}

export default App;
