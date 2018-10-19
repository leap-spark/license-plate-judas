import React, { Component } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Appbar, Button, Card, Paragraph, Title } from 'react-native-paper';
import firebase from '../../firebase';
import { API, Storage } from '../../lib';


export default class AccountView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            reports: [],
        };
    }


    async componentDidMount() {
        await Promise.all([ this._getReports() ]).catch((error) => console.error(error));
    }


    _getReports = async () => {
        const userData = await API.getUserData();
        const reports = await API.getReports(userData.reports_submitted);
        await this.setState({ reports, userData });
    };


    _logOut = async () => {
        firebase.auth().signOut();
        await Storage.delete('Token');

        this.props.navigator.navigate('Auth');
    };


    render() {
        return (
            <ScrollView contentContainerstyle={styles.home}>
                <Appbar>
                    <Appbar.Action icon="call-made" onPress={this._logOut} />
                </Appbar>

                <Text>My Account</Text>

                <Text>{this.state.userData.plate_number}</Text>

                { this.state.reports.length ? this.state.reports.map((i, j) => {
                    return (
                        <Card key={j}>
                            <Card.Content>
                                <Title>{ i.reason }</Title>
                                <Paragraph>{ i.mood }{ i.reported_by }{ i.location }{ i.timestamp }</Paragraph>
                            </Card.Content>
                        </Card>
                    );
                }) : <ActivityIndicator /> }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
