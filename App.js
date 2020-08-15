import React, { Component } from 'react';
import Main from './components/MainComponent';
import Error from './components/ErrorBoundary';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default class App extends Component{

  render(){
    return(
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            {/* <Error> */}

            <Main />
            {/* </Error> */}
          </PersistGate>
        </Provider>
    );
  }
}


