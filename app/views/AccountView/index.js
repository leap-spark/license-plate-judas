import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Wrapper from '../../components/Wrapper';
import MyAccount from '../../components/MyAccount';


export default class AccountView extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.navigation.setParams({
            backEnabled: true,
            title: 'My Account'
        });
    }


    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <MyAccount navigation={this.props.navigation} />
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
