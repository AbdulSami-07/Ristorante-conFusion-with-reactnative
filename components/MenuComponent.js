import React  from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';



const mapStateToProps = (state) => {
    return ({
        dishes : state.dishes
    });
}

class Menu extends React.Component {
    
    static navigationOptions = {
        title : 'Menu'
    };

    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) =>{
            return (
            <Animatable.View animation="fadeInRightBig" duration={2000} >
                <Tile 
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={()=>navigate('Dishdetail',{dishId: item.id})}
                    imageSrc={{uri: baseUrl + item.image }}
                />
            </Animatable.View>
            );
        };

        if(this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess){
            return(
                <Text>{this.props.dishes.errMess}</Text>
            );
        }
        else{
            return(
                <FlatList
                    data={this.props.dishes.dishes} // each element in array becomes item
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()} //keyExtractor take string as value. 
                />
            );
        }
    }

    
}

export default connect(mapStateToProps)(Menu);