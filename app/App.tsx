import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LookupView from './views/LookupView/index';
import LookupDetailView from './views/LookupDetailView/index';
import LoginView from './views/LoginView/index';
import MoodView from './views/MoodView/index';
import ReasonView from './views/ReasonView/index';
import FinishView from './views/FinishView/index';
import RegisterView from './views/RegisterView/index';
import AccountView from './views/AccountView/index';

import Authenticator from './components/Authenticator/index';
import NavigationDrawer from './components/NavigationDrawer/index';

import { SENTRY_DSN } from 'react-native-dotenv';
import Sentry from 'sentry-expo';

Sentry.enableInExpoDevelopment = true;
Sentry.config(SENTRY_DSN).install();

/**
 * The react navigation works by creating "stacks" of navigation items that get encapsulated into a navigation component.
 *
 * [1] First there is the main App stack, which are components that belong to the flow of using the plate lookup/reporting functionality. All were doing
 *     is saying "here are all the components that are navigable between each other." We can also dictate which view displays first, which is the "Lookup" view.
 *
 * [2] Next, we create the drawer navigation - the nav that appears when you click the "..." button in the header. This stack generates drawer items for each
 *     component passed to it. In this case, we don't want all of the items available in the first stack as their own navigable items, instead we only want
 *     to allow the user to navigate to two screens - the Lookup and My Account.
 *
 * [3] The auth stack exists to enable a user flow between logging in or registering, and the main app. We don't want users to be able to accidentally
 *     to see any components or a "flash" of content before being redirected back to the login screen. The auth stack exists solely to ensure the login
 *     view displays first, and after logging in - prevents users from hitting the back button and landing again on the login page. All we need to do here
 *     is pass the components that are related to login, in this case "LoginView" and "RegisterView".
 *
 * [4] Finally, we create a switch navigator, which is essential when using the auth stack. Here we pass a component "Authenticator" to be used as the
 *     AuthLoading view, DrawerStack to App, and Auth to AuthStack. We then set the initial route to be directed to the AuthLoading component.
 */

// [1]
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

// [2]
const DrawerStack = createDrawerNavigator(
    {
        Home: {
            screen: AppStack,
            navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon: (<Icon name="search" size={20} color="#000" />)
            }
        },
        MyAccount: {
            screen: AccountView,
            navigationOptions: {
                drawerLabel: 'My Account',
                drawerIcon: (<Icon name="account-box" size={20} color="#000" />)
            }
        }
    }, {
        initialRouteName: 'Home',
        contentComponent: NavigationDrawer,
    }
);

// [3]
const AuthStack = createStackNavigator(
    {
        Login: LoginView,
        Register: RegisterView,
    },
    {
        headerMode: 'none',
    }
);

// [4]
const TopLevelNavigation = createSwitchNavigator(
    {
        AuthLoading: Authenticator,
        App: DrawerStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#2C3A47',
        accent: '#55E6C1',
    }
};

export default class App extends Component {
    public render(): React.ReactNode {
        return (
            <PaperProvider theme={theme}>
                <TopLevelNavigation />
            </PaperProvider>
        );
    }
}
