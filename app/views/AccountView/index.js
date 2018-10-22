import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';

import { Card, Paragraph, Title } from 'react-native-paper';
import { API } from '../../lib';
import Wrapper from '../../components/Wrapper';


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


    render() {
        return (
            <Wrapper>
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
            </Wrapper>
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
