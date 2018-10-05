import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeView from './app/views/HomeView';
import Lookup from './app/components/Lookup';
import Login from './app/components/Login';


const TopLevelNavigation = createStackNavigator(
    {
        Home: HomeView,
        Lookup,
        Login,
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
