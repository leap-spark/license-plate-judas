import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from 'react-native-paper';
import firebase from '../../firebase';
import { SecureStore } from 'expo';


export default class AccountView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            reports: [],
        };
    }


    async componentDidMount() {
        await Promise.all([ this._getUserData(), this._getReports(this.state.userData.reports_submitted) ]);
    }


    _getUserData = async () => {
        const userID = await firebase.auth().currentUser.uid;
        let userData = {};

        await firebase.database().ref('/users_meta/' + userID)
            .once('value', (snapshot) => {
                userData = snapshot.val();
            })
            .catch((error) => console.error(error));

        await this.setState({ userData });
    };


    _getReports = async (ids) => {
        ids = Object.keys(ids);
        let reports = [];

        // This was 500ms faster than filtering the data on server
        // See: https://stackoverflow.com/questions/35931526/speed-up-fetching-posts-for-my-social-network-app-by-using-query-instead-of-obse/35932786#35932786
        await Promise.all(
            ids.map(id => {
                return firebase.database().ref('/reports/' + id).once('value', (snapshot) => reports.push(snapshot.val()))
            })
        );

        await this.setState({ reports });
    };


    render() {
        return (
            <View style={styles.home}>
                <Text>My Account</Text>

                <Button
                    onPress={ async () => {
                        firebase.auth().signOut();
                        await SecureStore.deleteItemAsync('Token');
                        this.props.navigator.navigate('Auth');
                    }}
                    title="Signout">Sign Out</Button>
                <Text>{this.state.userData.plate_number}</Text>
                <Text>Reports Submitted: {this.state.userData.reports_submitted && this.state.userData.reports_submitted.length}</Text>
            </View>
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
