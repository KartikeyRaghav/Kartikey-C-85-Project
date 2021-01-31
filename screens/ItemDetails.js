import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Card, Header, Icon } from 'react-native-elements'

export default class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.navigation.getParam('item')['itemName'],
            itemDescription: this.props.navigation.getParam('item')['item_description'],
            exchangeId: this.props.navigation.getParam('item')['exchangeId'],
            exchangerName: '',
            exchangerContact: '',
            exchangerAddress: ''
        }
    }

    getExchangerDetails = () => {
        db.collection('Users').where('emailId', '==', this.state.exchangeId).onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                var info = doc.data()
                this.setState({
                    exchangerName: info.firstName + ' ' + info.lastName,
                    exchangerAddress: info.address,
                    exchangerContact: info.contact
                })
            })
        })
    }

    componentDidMount=()=>{
        this.getExchangerDetails();
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()} />}
                    centerComponent={{ text: "Item Details", style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
                    backgroundColor="#eaf8fe"
                />
                <ScrollView>
                    <Card
                        title={"Item Information"}
                        titleStyle={{ fontSize: 20 }}
                    >
                        <Card >
                            <Text style={{ fontWeight: 'bold' }}>Name : {this.state.itemName}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Reason : {this.state.itemDescription}</Text>
                        </Card>
                    </Card>
                    <Card
                        title={"Exchanger Information"}
                        titleStyle={{ fontSize: 20 }}
                    >
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Name: {this.state.exchangerName}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.exchangerContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Address: {this.state.exchangerAddress}</Text>
                        </Card>
                    </Card>
                </ScrollView>
            </View>
        )
    }
}