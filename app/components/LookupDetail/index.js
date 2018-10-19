import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import { Headline, Card, Title, Paragraph } from 'react-native-paper';

import { API } from '../../lib';


export default class LookupDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reports: [],
            paginateAt: '',
        };
    }


    async componentDidMount() {
        const plate = this.props.navigator.getParam('plate');
        const reports = await API.getReportsForPlate(plate);
        await this.setState({ reports });
    }


    render() {
        return (
            <ScrollView style={{ flex: 1, paddingTop: 55 }}>
                <Headline>{this.props.navigator.getParam('plate')}</Headline>
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
