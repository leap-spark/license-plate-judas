import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import firebase from '../../firebase';
import { SecureStore } from 'expo';


export default class AccountView extends Component {

    static navigationOptions = {
        title: 'My Account',
        tabBarIcon: (<Icon name="rocket" size={20} color="#fff" />)
    };


    render() {
        return (
            <View style={styles.home}>
                <Text>My Account</Text>

                <Button
                    onPress={ async () => {
                        firebase.auth().signOut();
                        await SecureStore.deleteItemAsync('Token');
                        this.props.navigator.navigate('Auth');
                    }}
                    title="Signout">Sign Out</Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
