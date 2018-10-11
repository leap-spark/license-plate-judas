import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Lookup from '../../components/Lookup';


export default class LookupView extends Component {
    render() {
        return (
            <View style={styles.home}>
                <Lookup navigator={this.props.navigation} />
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
