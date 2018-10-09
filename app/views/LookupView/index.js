import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Lookup from '../../components/Lookup';
import Authenticator from '../../components/Authenticator';


export default class LookupView extends Component {
    render() {
        return (
            <View style={styles.home}>
                <Authenticator>
                    <Lookup navigator={this.props.navigation} />
                </Authenticator>
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
