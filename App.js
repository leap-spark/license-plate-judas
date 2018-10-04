import React, { Component } from 'react';
import homeView from './app/views/homeView';
import { createStackNavigator } from 'react-navigation';
import Lookup from "./app/components/Lookup";
import Login from "./app/components/Login";

const RootStack = createStackNavigator(
    {
        homeView,
        Lookup,
        Login
    },
    {
        initialRouteName: 'homeView',
        navigationOptions: {
          headerTitle: "License Plate Judas",
          headerStyle: {
              backgroundColor: '#990010'
          },
          headerTintColor: '#fff',
        }
    }
);

export default class App extends Component {
    render() {
        return <RootStack />
    }
}
