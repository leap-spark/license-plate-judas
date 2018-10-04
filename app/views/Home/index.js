import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Lookup from '../../components/Lookup';

export default class Home extends Component {
    render() {

        //TODO: If logged in, continue, else display login

        //TODO: Display passenger popup if
        //TODO: i. Location enabled
        //TODO: ii Movement faster than 10mph

        return (
            <View style={styles.home}>
                <Lookup />
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
