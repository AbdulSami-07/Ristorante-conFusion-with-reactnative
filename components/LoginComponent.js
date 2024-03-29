import React , { Component } from 'react';
import {  Input, CheckBox, Icon, Button } from 'react-native-elements';
import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';


class LoginTab extends Component {
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
        title: 'Login',
        tabBarIcon : ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}}
            />
        )
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
                            title=" Login"
                            icon={<Icon name='sign-in' type='font-awesome' color='white' size={24} />}
                            buttonStyle={{ backgroundColor: '#512DAB'}}
                        />
                </View>
                </View>
                <View style={styles.formButton}>
                    <Button 
                            onPress={() => this.props.navigation.navigate('Register')}
                            title=" Register"
                            type="clear"
                            icon={<Icon name='user-plus' type='font-awesome' color='white' size={24} color="blue" />}
                            titleStyle={{color: "blue" }}
                    />
                </View>
            </ScrollView>
        );
    }

}

class RegisterTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            firstname : '',
            lastname : '',
            email : '',
            remember : false,
            imageUrl : baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon : ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}}
            />
        )
    };

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
            if(!capturedImage.cancelled){
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromLibrary = async () => {
        //for ios 10 only
        if (Platform.OS === 'ios'){
            if(parseInt(Platform.Version,10)>=10){
                const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (cameraRollPermission.status === 'granted'){
                    let fetchedImage = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [4,3]
                    });
                    if(!fetchedImage.cancelled){
                        console.log(fetchedImage);
                        this.processImage(fetchedImage.uri);
                    }
                }
            }
        }

        //for other ios,web,android
        let fetchedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            allowsMultipleSelection: false
        });

        if(!fetchedImage.cancelled){
            console.log(fetchedImage);
            this.processImage(fetchedImage.uri);
        }
    }

    processImage = async (imageUrl) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUrl,
            [
                {resize : {width: 400}}
            ],
            {format : 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });
    }

    handleRegister(){
        console.log(JSON.stringify(this.state));
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
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                    />
                    <Button
                        title='Camera'
                        onPress={this.getImageFromCamera}
                    />
                    <Button
                        title='Gallery'
                        onPress={this.getImageFromLibrary}
                    />
                </View>
                <View style={styles.container}>
                    <Input 
                        placeholder="Username"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                    <Input 
                        placeholder="First Name"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                    />
                    <Input 
                        placeholder="Last Name"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                    />
                    <Input 
                        placeholder="Password"
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <Input 
                        placeholder="Email"
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
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
                        onPress={() => this.handleRegister()}
                        title=" Register"
                        icon={<Icon name='user-plus' type='font-awesome' color='white' size={24} />}
                        buttonStyle={{ backgroundColor: '#512DAB'}}
                    />
                </View>
                </View>
            </ScrollView>
        );
    }

    

}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
},
{
    tabBarOptions: {
        activeBackgroundColor : '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor : 'white',
        inactiveTintColor: 'gray',
    }
})

const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        margin: 20
    },
    formInput : {
        margin : 20
    },
    formCheckBox : {
        margin : 20,
        backgroundColor : null
    },
    formButton : {
        marginHorizontal: 60,
        marginVertical: 10
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default Login;