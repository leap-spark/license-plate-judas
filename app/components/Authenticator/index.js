import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Storage } from '../../lib';
import { withNavigation } from 'react-navigation';


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

export default withNavigation(Authenticator);
