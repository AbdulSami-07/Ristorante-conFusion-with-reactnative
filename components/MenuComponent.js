import React  from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

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
                <Tile 
                    key={index}
                    title={item.name}
                    captions={item.description}
                    featured
                    onPress={()=>navigate('Dishdetail',{dishId: item.id})}
                    imageSrc={{uri: baseUrl + item.image }}
                />
            );
        };


        return(
            <FlatList
                data={this.props.dishes.dishes} // each element in array becomes item
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()} //keyExtractor take string as value. 
            />
        );
    }

    
}

export default connect(mapStateToProps)(Menu);