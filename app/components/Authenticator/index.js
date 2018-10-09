import React, { Component } from 'react';
import { View } from 'react-native';
import Storage from '../../lib/storage';
import { withNavigation } from 'react-navigation';


class Authenticator extends Component {

    constructor(props) {
        super(props);
    }


    async componentDidMount() {
        const data = await Storage.get('Token');

        if (!data) {
            this.props.navigation.navigate('Home');
        }
    }


    render() {
        return (
            <View>
                { this.props.children }
            </View>
        );
    }
}

export default withNavigation(Authenticator);
