import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import LookupView from './app/views/LookupView';
import LoginView from './app/views/LoginView';


const TopLevelNavigation = createStackNavigator(
    {
        Home: LoginView,
        Lookup: LookupView,
        Login: LoginView,
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#AE0010',
            },
            headerTintColor: '#fff',
            headerTitle: 'License Plate Judas',
        }
    }
);

export default class App extends Component {

    render() {
        return (
            <TopLevelNavigation />
        );
    }
}
