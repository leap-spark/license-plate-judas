import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Finalize from '../../components/Finalize';


export default class FinishView extends Component {
    render() {
        return (
            <View style={styles.home}>
                <Finalize navigator={this.props.navigation} />
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
