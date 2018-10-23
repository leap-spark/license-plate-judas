import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Headline, List } from 'react-native-paper';

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
        const plate = this.props.navigation.getParam('plate');
        const reports = await API.getReportsForPlate(plate);
        await this.setState({ reports });
    }


    _generateComponentList = () => {
        return (
            <List.Section title="Latest Reports">
                { this.state.reports.map((i, j) => {
                    const mood = i.mood === 'happy' ? 'mood' : 'mood-bad';

                    return (
                        <List.Item
                            key={j}
                            title={i.reason}
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
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Headline style={styles.header}>
                        {this.props.navigation.getParam('plate')}
                    </Headline>
                </View>

                { this.state.reports.length ? this._generateComponentList() : <ActivityIndicator /> }
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
