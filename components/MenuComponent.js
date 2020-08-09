import React  from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Menu(props){

    const renderMenuItem = ({item, index}) =>{
        return (
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true} //to hide right arrow as used in ios
                onPress={()=> props.onPress(item.id)}
                leftAvatar={{source: require('./images/uthappizza.png')}}
            />
        );
    };

    return(
        <FlatList
            data={props.dishes} // each element in array becomes item
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} //keyExtractor take string as value. 
        />
    );

    
}

export default Menu;