import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LookupView from './app/views/LookupView';
import LookupDetailView from './app/views/LookupDetailView';
import LoginView from './app/views/LoginView';
import RegisterView from './app/views/RegisterView';
import Authenticator from './app/components/Authenticator';


const AppStack = createStackNavigator(
    {
        Home: LookupView,
        Lookup: LookupView,
        LookupDetail: LookupDetailView,
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#AE0010',
            },
            headerTintColor: '#fff',
            headerTitle: 'License Plate Judas',
        }
    }
);

const AuthStack = createStackNavigator(
    {
        Login: LoginView,
        Register: RegisterView,
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#AE0010',
            },
            headerTintColor: '#fff',
            headerTitle: 'Login',
        }
    }
);

const TopLevelNavigation = createSwitchNavigator(
    {
        AuthLoading: Authenticator,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default class App extends Component {
    render() {
        return (
            <TopLevelNavigation />
        );
    }
}
