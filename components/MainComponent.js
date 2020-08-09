import React , { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import { View, ScrollView,SafeAreaView } from 'react-native';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES,
            selectedDish: null
        }
    }

    onDishSelected(dishId){
        this.setState({
            selectedDish : dishId
        });
    }

    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <Menu dishes= {this.state.dishes} onPress={(dishId) =>this.onDishSelected(dishId)} />
                    <Dishdetail dish={this.state.dishes.filter((dish)=> dish.id == this.state.selectedDish)[0]} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Main;