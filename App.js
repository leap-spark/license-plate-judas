import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import LookupView from './app/views/LookupView';
import LookupDetailView from './app/views/LookupDetailView';
import LoginView from './app/views/LoginView';
import MoodView from './app/views/MoodView';
import ReasonView from './app/views/ReasonView';
import FinishView from './app/views/FinishView';
import RegisterView from './app/views/RegisterView';
import AccountView from './app/views/AccountView';

import Authenticator from './app/components/Authenticator';


const AppStack = createStackNavigator(
    {
        Lookup: LookupView,
        LookupDetail: LookupDetailView,
        Mood: MoodView,
        Reason: ReasonView,
        Finish: FinishView,
    },
    {
        initialRouteName: 'Lookup',
        headerMode: 'none'
    }
);

const TabStack = createMaterialBottomTabNavigator({
    Home: AppStack,
    MyAccount: AccountView
}, {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
});

const AuthStack = createStackNavigator(
    {
        Login: LoginView,
        Register: RegisterView,
    },
    {
        headerMode: 'none',
    }
);

const TopLevelNavigation = createSwitchNavigator(
    {
        AuthLoading: Authenticator,
        App: TabStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default class App extends Component {
    render() {
        return (
            <PaperProvider>
                <TopLevelNavigation />
            </PaperProvider>
        );
    }
}
