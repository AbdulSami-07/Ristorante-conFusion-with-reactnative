import React , { Component } from 'react';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            remember : false
        }
    }

    componentDidMount() {
        //Retrieving the data from SecureStore. using userinfo as key
        SecureStore.getItemAsync('userinfo') 
            .then(userdata => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            });
    }

    static navigationOptions = {
        title: 'Login'
    };

    handleLogin() {
        console.log(this.state);
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
                )
            .catch( error => console.log('Could not save user info',error));
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch( error =>console.log('could not delete user info',error));
        }
    }

    render() {
        return (
            <ScrollView style={{flex:1}} >
                <View style={styles.container}>
                    <Input 
                        placeholder="Username"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                    <Input 
                        placeholder="Password"
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <CheckBox
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckBox}
                    />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#521DAB"
                    />
                </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        margin: 20
    },
    formInput : {
        margin : 40
    },
    formCheckBox : {
        margin : 40,
        backgroundColor : null
    },
    formButton : {
        margin : 60
    }
});

export default Login;