import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LookupView from './app/views/LookupView';
import LookupDetailView from './app/views/LookupDetailView';
import LoginView from './app/views/LoginView';
import MoodView from './app/views/MoodView';
import ReasonView from './app/views/ReasonView';
import FinishView from './app/views/FinishView';
import RegisterView from './app/views/RegisterView';

import Authenticator from './app/components/Authenticator';


const AppStack = createStackNavigator(
    {
        Home: LookupView,
        Lookup: LookupView,
        LookupDetail: LookupDetailView,
        Mood: MoodView,
        Reason: ReasonView,
        Finish: FinishView,
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#AE0011',
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
