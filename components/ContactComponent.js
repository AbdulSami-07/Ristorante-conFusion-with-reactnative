import React , { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


function RenderItem(props){

    return (
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card 
                title={"Contact Information"}
            >
                <Text>
                121, Clear Water Bay Road{"\n\n"}
                Clear Water Bay, Kowloon{"\n\n"}
                HONG KONG{"\n\n"}
                Tel: +852 1234 5678{"\n\n"}
                Fax: +852 8765 4321{"\n\n"}
                Email:confusion@food.net
                </Text>
                <Button
                    title=' Send Email'
                    buttonStyle={{ backgroundColor: '#512DAB', margin: 20}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={() => props.sendMail()}
                />
            </Card>
        </Animatable.View>
    );
}

class Contact extends Component{

    constructor(props){
        super(props);
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject : 'Enquiry',
            body : 'To whom it may concern:'
        });
    }

    static navigationOptions = {
        title : 'Contact us'
    };

    render(){
        return(
            <RenderItem sendMail={() => this.sendMail()} />
        );
    }
}

export default Contact;