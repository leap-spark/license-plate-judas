import React, { Component } from 'react';
import HomeView from './app/views/HomeView';
import Lookup from './app/components/Lookup';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
    {
        Home: HomeView,
        Lookup,
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends Component {
    render() {
        return (<RootStack />);
    }
}
