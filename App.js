import React, { Component } from 'react';
import HomeView from './app/views/HomeView';
import Lookup from './app/components/Lookup';
import Login from './app/components/Login';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
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
        return (<RootStack />);
    }
}
