import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import LookupDetail from '../../components/LookupDetail';
import Wrapper from '../../components/Wrapper';


export default class LookupDetailView extends Component {

    componentWillMount() {
        this.props.navigation.setParams({
            backEnabled: true,
            title: 'Viewing Details'
        });
    }


    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <LookupDetail navigation={this.props.navigation} />
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
