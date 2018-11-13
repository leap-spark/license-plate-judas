import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Storage } from '../../lib/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

class Authenticator extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    public async componentDidMount(): Promise<boolean> {
        const userToken = await Storage.get('Token');
        return this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }


    public render(): React.ReactNode {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default withNavigation(Authenticator);
