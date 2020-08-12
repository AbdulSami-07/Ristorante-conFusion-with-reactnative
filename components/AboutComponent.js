import React , { Component } from 'react';
import { Card, ListItem, Text } from 'react-native-elements';
import { ScrollView, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
    return ({
        leaders : state.leaders
    });
}

function RenderHistory(props){
    return(
        <Card>
            <Text style={{fontWeight: 'bold',textAlign: 'center',fontSize: 16}}>
            Our History
            {'\n\n'}
            </Text>
            <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            {"\n\n"}
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

class About extends Component{
    
    static navigationOptions = {
        title : 'About us'
    };

    render(){
        const renderMenuItem = ({item, index}) =>{
            return (
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true} //to hide right arrow as used in ios
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        };

        if (this.props.leaders.isLoading){
            return(
                <SafeAreaView>
                    <ScrollView>
                        <RenderHistory />
                        <Card title="Corporate Leadership">
                            <Loading />
                        </Card>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else if (this.props.leaders.errMess){
            return(
                <SafeAreaView>
                    <ScrollView>
                        <RenderHistory />
                        <Card title="Corporate Leadership">
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else{
                return(
                    <SafeAreaView>
                        <ScrollView>
                            <RenderHistory />
                            <Card title="Corporate Leadership">
                                <FlatList
                                    data={this.props.leaders.leaders} // each element in array becomes item
                                    renderItem={renderMenuItem}
                                    keyExtractor={item => item.id.toString()} //keyExtractor take string as value. 
                                />
                            </Card>
                        </ScrollView>
                    </SafeAreaView>
                );
        }
    }
        
}

export default connect(mapStateToProps)(About);
