import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { Storage } from '../../lib';


class Authenticator extends Component {

    constructor(props) {
        super(props);
    }


    async componentDidMount() {
        const userToken = await Storage.get('Token');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }


    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

Authenticator.propTypes = {
    navigation: PropTypes.object,
};

export default withNavigation(Authenticator);
