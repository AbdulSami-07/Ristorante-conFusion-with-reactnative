import React , { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import { View, Platform, Image, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems  } from 'react-navigation';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos} from '../redux/ActionCreators';


const mapDispatchToProps = dispatch =>{
    return ({
        fetchComments: () => dispatch(fetchComments()),
        fetchPromos: () => dispatch(fetchPromos()),
        fetchLeaders: () => dispatch(fetchLeaders()),
        fetchDishes: () => dispatch(fetchDishes())
    });
};

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({navigation}) => ({ //navigation is the prop provided by navigationOptions
            //headerLeft lets us to add icon or text or anything in left of status bar. 
            headerLeft : <Icon name="menu" size={24} color='white' iconStyle={{marginLeft: 5}} 
                onPress={() => navigation.toggleDrawer()}
                />
        }) },
    Dishdetail: { screen: Dishdetail }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);

//creatstacknavigator provide status bar , title to screen. 
const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
},
{
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"       
        },
        headerLeft : <Icon name="menu" size={24} color='white' iconStyle={{marginLeft: 5}}
        onPress={() => navigation.toggleDrawer()}
        />
    })
});

const AboutNavigator = createStackNavigator({
    About: {screen : About},  
},
{
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft : <Icon name="menu" size={24} color='white' iconStyle={{marginLeft: 5}} 
        onPress={() => navigation.toggleDrawer()}
        />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: {screen : Contact},  
},
{
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft : <Icon name="menu" size={24} color='white' iconStyle={{marginLeft: 5}} 
        onPress={() => navigation.toggleDrawer()}
        />
    })
});

const ReservationNavigator = createStackNavigator({
    Contact: {screen : Reservation},  
},
{
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft : <Icon name="menu" size={24} color='white' iconStyle={{marginLeft: 5}} 
        onPress={() => navigation.toggleDrawer()}
        />
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        {/* SafeAreaView is for iphoneX that define part of safe area where nothing will be layed out.   */}
        <SafeAreaView style={styles.container}
        >
        {/* this View will be shown over Draw items already in drawer */}
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
        {/* {...props} is ES6 way to pass all props */}
        {/* DrawerItems are items that are automatically constructed from createDrawerNavigation used earlier  */}
            <DrawerItems {...props} /> 
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            //drawerIcon will receive tintColor as props
            drawerIcon : ({tintColor}) =>(
                <Icon 
                    name="home"
                    //type tell which font library to use. 
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About us',
            drawerLabel: 'About us',
            drawerIcon : ({tintColor}) =>(
                <Icon 
                    name="info-circle"
                    //type tell which font library to use. 
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon : ({tintColor}) =>(
                <Icon 
                    name="list"
                    //type tell which font library to use. 
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact us',
            drawerLabel: 'Contact us',
            drawerIcon : ({tintColor}) =>(
                <Icon 
                    name="address-card"
                    //type tell which font library to use. 
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon : ({tintColor}) =>(
                <Icon 
                    name="cutlery"
                    //type tell which font library to use. 
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
},{
    drawerBackgroundColor: '#D1C4E9',
    contentComponent : CustomDrawerContentComponent
});

class Main extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchPromos();
        this.props.fetchComments();
    }

    render() {
        return(
                <View style={{flex : 1 }}>
                    <MainNavigator />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1
    },
    drawerHeader:{
        backgroundColor: '#512DAB',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});
export default connect(null,mapDispatchToProps)(Main);