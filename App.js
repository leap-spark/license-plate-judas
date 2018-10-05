import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import LookupView from './app/views/LookupView';
import Lookup from './app/components/Lookup';
import Login from './app/components/Login';


const TopLevelNavigation = createStackNavigator(
    {
        Home: Login,
        Lookup: LookupView,
        Login,
    },
    {
        initialRouteName: 'Lookup',
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
