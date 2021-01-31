import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import SwipeableList from '../components/SwipeableList';
import db from '../config';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        };

        this.notificationRef = null
    }

    getNotifications = () => {
        this.requestRef = db.collection("all_notifications")
            .where("notification_status", "==", "unread")
            .where("targeted_user_id", '==', this.state.userId)
            .onSnapshot((snapshot) => {
                var allNotifications = []
                snapshot.docs.map((doc) => {
                    var notification = doc.data()
                    notification["doc_id"] = doc.id
                    allNotifications.push(notification)
                });
                this.setState({
                    allNotifications: allNotifications
                });
            })
    }

    componentDidMount() {
        this.getNotifications();
    }

    componentWillUnmount() {
        this.notificationRef = null
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                leftElement={<Icon name="bell" type="font-awesome" color='#696969' />}
                title={item.itemName}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitle={item.message}
                bottomDivider
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1 }}>
                    <MyHeader title={"Notifications"} navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allNotifications.length === 0
                            ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25 }}>You have no notifications</Text>
                                </View>
                            )
                            : (
                                <SwipeListView
                                    data={this.state.allNotifications}
                                    renderItem={data => {
                                        <View>
                                            <Text>Hello</Text>
                                        </View>
                                    }}
                                    renderHiddenItem={() => {
                                        <View>
                                            <Text>HI</Text>
                                        </View>
                                    }}
                                    disableRightSwipe={true}
                                    previewOpenDelay={3000}
                                    friction={10}
                                    tension={40}
                                    leftOpenValue={75}
                                    stopLeftSwipe={75}
                                    rightOpenValue={-75}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})