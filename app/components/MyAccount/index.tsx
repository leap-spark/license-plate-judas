import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View, Text } from 'react-native';
import { Headline } from 'react-native-paper';

import ReportList from '../ReportList/index';
import { API } from '../../lib';


interface IState {
    userData: object,
    reports: object[],
    isDoingAction: boolean,
}

interface IUserData {
    reports_submitted: string[],
}

export default class MyAccount extends Component<{}, IState> {

    constructor(props: object) {
        super(props);

        this.state = {
            userData: {},
            reports: [],
            isDoingAction: true,
        };
    }


    async componentDidMount() {
        const userData: UserData = await API.getUserData();
        const reports: object[] = await API.getReportsByIds(userData.reports_submitted);

        await this.setState({
            reports,
            userData,
            isDoingAction: false,
        });
    }


    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator animating={this.state.isDoingAction} />
                </View>
                <View style={styles.headerContainer}>
                    <Headline style={styles.header}>
                        My Account
                    </Headline>
                </View>

                { this.state.reports.length ?
                    <ReportList
                        data={this.state.reports}
                        initialNumToRender={7}
                    />
                    : <Text>No Recent Reports</Text> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: '#eee',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        alignItems: 'stretch',
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        width: Dimensions.get('window').width,
    },
    headerContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#efefef',
        paddingVertical: 10,
    },
    header: {
        alignSelf: 'center',
        color: '#000',
    },
});
