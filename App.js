import React, { Component } from 'react';
import Main from './components/MainComponent';
import Error from './components/ErrorBoundary';


export default class App extends Component{

  render(){
    return(
      <Error>
        <Main />
      </Error>
    );
  }
}


