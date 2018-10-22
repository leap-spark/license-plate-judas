import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Login from '../../components/Login';
import Wrapper from '../../components/Wrapper';


// TODO: Needs styling
export default class LoginView extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.navigation.setParams({ 'title': 'Login' });
    }


    render() {
        return (
            <Wrapper>
                <View style={ styles.home }>
                    <Login navigation={ this.props.navigation } />
                </View>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
});
