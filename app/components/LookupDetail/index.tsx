import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Headline } from 'react-native-paper';

import { API } from '../../lib/index';
import ReportList from '../ReportList/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

interface IState {
    reports: object[],
    paginateAt: string,
    isDoingAction: boolean,
}

export default class LookupDetail extends Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            reports: [],
            paginateAt: '',
            isDoingAction: true,
        };
    }


    public async componentDidMount(): Promise<any> {
        const plate = this.props.navigation.getParam('plate');
        const reports = await API.getReportsForPlate(plate);

        await this.setState({
            reports,
            isDoingAction: false,
        });
    }


    public render() {
        const state: string = this.props.navigation.getParam('plate').substring(0, 2);
        const plate: string = this.props.navigation.getParam('plate').slice(2);

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Headline style={styles.header}>
                        {state} - {plate}
                    </Headline>
                </View>

                <ActivityIndicator animating={this.state.isDoingAction } />

                { this.state.reports.length && !this.state.isDoingAction ?
                    <ReportList
                        data={this.state.reports}
                        initialNumToRender={7}
                    />
                    : <Text>No Reports Found</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        alignSelf: 'stretch',
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
