import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './app/components/Login';
import Lookup from './app/views/home';
import { createStackNavigation } from 'react-navigation';


// export default class App extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Login />
//             </View>
//         );
//     }
// }

const RootStack = createStackNavigator(
    {
      Home: Login,
      Lookup: Lookup,
    },
    {
      initialRouteName: 'Home',
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class App extends Component {
  render() {
    return <RootStack />
  }
}
