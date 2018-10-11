import React, { Component } from 'react';
import { View, Text } from 'react-native';

import firebase from '../../api';


export default class LookupDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reports: []
        };
    }


    async componentDidMount() {
        await this._getReports();
    }


    _getReports = async () => {
        const plate = this.props.navigator.getParam('plate');
        const reportsNormalized = [];

        await firebase.database().ref('/reports')
            .orderByChild('plate_number')
            .equalTo(plate.toLowerCase())
            .once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    reportsNormalized.push({
                        ...childSnapshot.val()
                    });
                });
            })
            .catch((error) => console.error(error));

        await this.setState({
            reports: reportsNormalized
        })
    };


    render() {
        return (
            <View>
                <Text>Details</Text>
                { this.state.reports.length ? this.state.reports.map((i, j) => {
                    return (
                        <View key={j}>
                            <Text>{ i.plate_number }</Text>
                            <Text>{ i.mood }</Text>
                            <Text>{ i.reason }</Text>
                            <Text>{ i.reported_by }</Text>
                            <Text>{ i.location }</Text>
                            <Text>{ i.timestamp }</Text>
                        </View>
                    );
                }) : <Text>No reports found</Text> }
            </View>
        );
    }
}
