import React , { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return ({
        dishes : state.dishes,
        comments : state.comments
    });
}



function RenderComments(props){

    const comments = props.comments;
    
    const renderCommentItem = ({item,index}) =>{
        const date =  new Intl.DateTimeFormat('en-us',{year :'numeric',month:'short',day:'2-digit'}).format(new Date(item.date));
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize : 14}}>{item.comment}</Text>
                <Text style={{fontSize : 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize : 12}}>{'-- ' + item.author + ', ' + date}</Text>
            </View>
        );
    }

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props){

    const dish = props.dish;

    if(dish != null){
        return (
            <Card
                featuredTitle={dish.name}
                image={{uri : baseUrl + dish.image}}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon 
                    raised
                    reverse
                    name={ props.favorites ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color="#F50"
                    onPress={() => props.favorites ? console.log("Already favorite") : props.onPress() }
                />
            </Card>
        );
    }
    else{
        return(<View></View>);
    }
}

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state = { 
            favorites: []
        }
    }

    static navigationOptions = {
        title : 'Dish Details'
    };

    markFavorite(dishId){
        this.setState({
            favorites: this.state.favorites.concat(dishId)
        })
    }


    render(){
        
        const dishId= this.props.navigation.getParam('dishId','');

        console.log(dishId);
        return(
            <ScrollView>
                {/* //+ will change to number. */}
            <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorites={this.state.favorites.some(el =>el === dishId)}
                onPress={() => this.markFavorite(dishId)}
            /> 
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId))} />
            </ScrollView>
        );
    }
    
}

export default connect(mapStateToProps)(Dishdetail);