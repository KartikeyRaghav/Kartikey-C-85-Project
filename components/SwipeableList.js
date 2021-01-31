import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: this.props.allNotification,
        };
    }


    updateMarkAsread = (notification) => {
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notification_status": "read"
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={this.state.allNotifications}
                    renderItem={({ item, i }) => {
                        <ListItem
                            key={i}
                            leftElement={<Icon name="bell" type="font-awesome" color='#696969' />}
                            title={'  ' + item.itemName}
                            titleStyle={{ color: 'black', fontWeight: 'bold' }}
                            subtitle={'  ' + item.message}
                            bottomDivider
                        />
                    }}
                    renderHiddenItem={() => (
                        <View style={{ backgroundColor: 'red' }}>
                            <Text>Delete</Text>
                        </View>
                    )}
                    disableRightSwipe={true}
                    previewOpenDelay={3000}
                    friction={10}
                    tension={40}
                    leftOpenValue={75}
                    stopLeftSwipe={75}
                    rightOpenValue={-75}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
