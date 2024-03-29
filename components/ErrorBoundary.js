import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class Error extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {   
         // Update state so the next render will show the fallback UI. 
           
           return console.log(error.toString());
          }
    componentDidCatch(error, errorInfo) {
            // You can also log the error to an error reporting service    
            this.setState({
              hasError: true
            })
            logErrorToMyService(error, errorInfo);  
        }
    render() {
      if (this.state.hasError) {      
          // You can render any custom fallback UI
        return (
            <View style={{flex : 1}}>
                <Image
                    source={require('./images/oops.png')}
                    style={{ width: 100, height: 200 }}
                  />
            </View>
        );
        }
      return this.props.children; 
    }
}

export default Error;
