import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import { Card, Headline, List, Paragraph, Title } from 'react-native-paper';

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


    componentWillMount() {
        this.props.navigation.setParams({
            backEnabled: true,
            title: 'My Account'
        });
    }


    async componentDidMount() {
        await this._getReports();
    }


    _getReports = async () => {
        const userData = await API.getUserData();
        const reports = await API.getReports(userData.reports_submitted);
        await this.setState({ reports, userData });
    };


    _generateComponentList = () => {
        return (
            <List.Section title="Recent Submissions">
                { this.state.reports.map((i, j) => {
                    const mood = i.mood === 'happy' ? 'mood' : 'mood-bad';

                    return (
                        <List.Item
                            key={j}
                            title={i.plate_number + ' for ' + i.reason}
                            description={i.location + ' @ ' + i.timestamp}
                            left={ () => <List.Icon icon={mood} color="#000" /> }
                        />
                    );
                }) }
            </List.Section>
        );
    };


    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Headline>My Account</Headline>

                    <Text>Claimed Plate: {this.state.userData.claimed_license_plate}</Text>

                    { this.state.reports.length ? this._generateComponentList() : <ActivityIndicator /> }
                </View>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
});
