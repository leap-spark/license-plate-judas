import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Reason from '../../components/Reason';
import Wrapper from '../../components/Wrapper';


export default class MoodView extends Component {
    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Reason navigator={this.props.navigation} />
                </View>
            </Wrapper>
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
