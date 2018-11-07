import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Storage } from '../../lib/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

class Authenticator extends Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }


    public async componentDidMount(): Promise<object> {
        const userToken = await Storage.get('Token');
        return this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }


    public render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default withNavigation(Authenticator);