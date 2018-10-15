import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Mood from '../../components/Mood';


export default class MoodView extends Component {
    render() {
        return (
            <View style={styles.home}>
                <Mood navigator={this.props.navigation} />
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
