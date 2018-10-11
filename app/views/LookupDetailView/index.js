import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import LookupDetail from '../../components/LookupDetail';


export default class LookupDetailView extends Component {
    render() {
        return (
            <View style={styles.home}>
                <LookupDetail navigator={this.props.navigation} />
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
