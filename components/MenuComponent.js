import React  from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES
        }
    }

    static navigationOptions = {
        title : 'Menu'
    };

    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) =>{
            return (
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true} //to hide right arrow as used in ios
                    onPress={()=>navigate('Dishdetail',{dishId: item.id})}
                    leftAvatar={{source: require('./images/uthappizza.png')}}
                />
            );
        };


        return(
            <FlatList
                data={this.state.dishes} // each element in array becomes item
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()} //keyExtractor take string as value. 
            />
        );
    }

    
}

export default Menu;