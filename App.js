import React, { Component } from 'react';
import Login from './app/components/Login';
import Home from './app/views/Home';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
    {
        Home: Login,
        Lookup: Home,
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends Component {
    render() {
        return <RootStack />
    }
}
