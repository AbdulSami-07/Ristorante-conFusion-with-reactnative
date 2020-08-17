import React , { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = (state) => {
    return ({
        dishes : state.dishes,
        comments : state.comments,
        favorites : state.favorites
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        postFavorite:  (dishId) => dispatch(postFavorite(dishId)),
        postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
    });
}



function RenderComments(props){

    const comments = props.comments;
    
    const renderCommentItem = ({item,index}) =>{
        
        const date =  moment(new Date).format('ll');
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize : 14}}>{item.comment}</Text>
                <View style={styles.commentRating}>
                    <Rating imageSize={12} readonly startingValue={item.rating} style={{marginLeft: 0}} />
                </View>
                <Text style={{fontSize : 12}}>{'-- ' + item.author + ', ' + date}</Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props){

    const dish = props.dish;

    handleViewRef = (ref) => this.view = ref; 

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < -200) //Right to Left gesture
            return 'rtl';
        else if (dx > 200)
            return 'ltr';
    };

    const panResponder = PanResponder.create({
        //this is called when user gesture begins on the screen. 
        onStartShouldSetPanResponder: (evt, gestureState) =>{
            return true;
        },
        //this is called when panResponder is grant perm to respond to gesture
        onPanResponderGrant: () => {

            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished': 'cancelled'));
        },
        onPanResponderEnd: (evt, gestureState) => {
            if (recognizeDrag(gestureState) === 'rtl')
                Alert.alert(
                    'Add to Favorites',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorites ? console.log("Already favorite") : props.markFavorite() 
                        }
                    ]
                );

            else if (recognizeDrag(gestureState) === 'ltr')
                    props.toggleModal();

            return true;
        }
    });

    if(dish != null){
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={dish.name}
                    image={{uri : baseUrl + dish.image}}
                >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.cardIcon}>
                    <Icon 
                        raised
                        reverse
                        name={ props.favorites ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color="#F50"
                        onPress={() => props.favorites ? console.log("Already favorite") : props.markFavorite() }
                    />
                    <Icon 
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color="#512DAB"
                        onPress={() => props.toggleModal()}
                    />
                    </View>
                </Card>
            </Animatable.View>
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
            rating : 5,
            author : '',
            comment: '',
            showModal: false
        }
    }

    toggleModal(){
        this.setState({
            showModal : !this.state.showModal
        });
    }

    resetForm(){
        this.setState({
            rating: 5,
            author: '',
            comment: ''
        });
    }

    static navigationOptions = {
        title : 'Dish Details'
    };

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    submitComment(dishId) {
            this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment)
            .then(() => {
                this.toggleModal();
                this.resetForm();
            })
    }

    render(){
        
        const dishId= this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                {/* //+ will change to number. */}
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorites={this.props.favorites.some(el =>el === dishId)}
                    markFavorite={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                /> 
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId))} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => {this.toggleModal();}}
                >
                        <Rating
                            showRating
                            imageSize={20}
                            onFinishRating={(rating) => this.setState({ rating : rating })}

                        />
                        <Input
                            placeholder='Author'
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='user-o'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='comment-o'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <View style={styles.modalButton}>
                        <Button 
                                title="Submit"
                                onPress={()=> this.submitComment(dishId)}
                                color="#512DAB"
                            />
                        </View>
                        <View style={styles.modalButton} >
                            <Button 
                                title="Close"
                                onPress={()=>{this.toggleModal();this.resetForm();}}
                                color='#494f52'
                            /> 
                        </View>
                </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    modalButton:{
        margin: 20
    },
    cardIcon:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center'
    },
    commentRating : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);