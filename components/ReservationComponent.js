import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';


class Reservation extends Component{

    constructor(props){
        super(props);
        this.state = {
            guests : 1,
            smoking : false,
            date: new Date(),
            showCalendar: false,
            mode: 'date'
        }
    }

    static navigationOptions = {
        title : 'Reserve Table'
    }

    resetForm(){
        this.setState({
            guests : 1,
            smoking : false,
            date: new Date(),
            showCalendar: false,
            mode : 'date'
        });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            'Number of guests: ' + this.state.guests.toString() + '\n' +
            'Smoking: ' + this.state.smoking.toString() + '\n' +
            'Date and Time: ' + moment(new Date(this.state.date)).format('LLL'),
            [ //Button Array
                { 
                    text: 'Cancel',
                    onPress: () => console.log('Reservation cancelled'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress : () => {
                        console.log(this.state);
                        this.persentLocalNotification(moment(new Date(this.state.date)).format('LLL'));
                        this.addReservationToCalender(this.state.date);
                        this.resetForm();
                    }
                }
            ],
            { cancelable: false} //for disabling dismissing behavior
        );
    }

    async obtainNotificationPermission(){
        let permisson = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permisson.status !== 'granted'){
            permisson = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permisson.status !== 'granted')
                Alert.alert('Permission not granted to show notifications');
        }
        return permisson;     
    }

    async persentLocalNotification(date){
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios : {
                sound : true
            },
            android : {
                sound : true,
                vibrate: true,
                color: '#512DAB'
            }
        });
    }

    async obtainCalendarPermission(){
        let permisson = await Permissions.askAsync(Permissions.CALENDAR);
        if (permisson.status !== 'granted'){
                Alert.alert('Permission not granted to add event to Calender');
        }
        return permisson;     
    }   


    async getDefaultCalendarId() {
        const calendars = await Calendar.getCalendarsAsync();
        if (calendars){
        const defaultCalendars = calendars.filter( calendar => calendar.id === '1');
        return defaultCalendars[0].id
        }
      }

    addReservationToCalender = async (date) => {
        const calenderPermission = await this.obtainCalendarPermission();
        if(calenderPermission){
            const calendarId =  await this.getDefaultCalendarId();
            if (calendarId !== ''){
                const startDate = new Date(Date.parse(date));
                const endDate = new Date(Date.parse(date) + (2 * 60 * 60 * 1000));
                const newEventId = Calendar.createEventAsync(calendarId,{
                                                    title : 'Con Fusion Table Reservation',
                                                    startDate : startDate,
                                                    endDate :  endDate,
                                                    location : '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
                                                    timeZone:  'Asia/Hong_Kong'
                                                });
                if (newEventId !== ""){
                    Alert.alert('Reservation has been added to your calendar');
                }
            }
        }
    }

    render() {
        return (
            <Animatable.View animation="zoomIn"  duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                    >
                        <Picker.Item label='1' value='1'/>
                        <Picker.Item label='2' value='2'/>
                        <Picker.Item label='3' value='3'/>
                        <Picker.Item label='4' value='4'/>
                        <Picker.Item label='5' value='5'/>
                        <Picker.Item label='6' value='6'/>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#3f9688'
                        onValueChange={(value) => this.setState({smoking: value})}
                    >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity
                        style={{
                            flex:1,
                            flexDirection: 'row',
                            paddingVertical: 7,
                            justifyContent:'space-evenly'
                        }}
                        onPress={() => this.setState({showCalendar: true, mode: 'date'})}
                    >
                        <Text style={{borderWidth:1,color:'black'}}>{moment(new Date(this.state.date)).format('d/MM/YY h:mm a')}</Text>
                        <Icon type='font-awesome' name='calendar' color='#512DA8' />
                    </TouchableOpacity>
                    {/* Date Time Picker */}
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            minimumDate={new Date()}
                            minuteInterval={30}
                            onChange={(event, date) => {
                                if (date === undefined) {
                                    this.setState({ showCalendar: false });
                                }
                                else {
                                    this.setState({
                                        showCalendar: this.state.mode === "time" ? false : true,
                                        mode: "time",
                                        date: new Date(date)
                                    });
                                }
                            }}
                        />
                    )}
                </View>
                <View style={styles.formRow}>
                    <Button 
                        title="Reserve"
                        color="#512DAB"
                        onPress={() => this.handleReservation()}
                        />
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DAB',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;