import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import firebase from '../../firebase';
import { API, Storage } from '../../lib';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isDoingAction: false,
            invalidateToken: false,
        };
    }


    _startActivityIndicators = () => {
        this.setState({ isDoingAction: true });
    };


    _endActivityIndicators = () => {
        this.setState({ isDoingAction: false });
    };


    _doRegistration = async () => {
        
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        this._startActivityIndicators();

        await API.registerUser(this.state.email, this.state.password);

        this._endActivityIndicators();

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }
    };


    _loginSuccess = async () => {
        const token = await firebase.auth().currentUser.uid;
        await Storage.set('Token', token);

        this.props.navigation.navigate('Lookup');
    };


    _renderRegisterFields = () => {
        return (
            <View>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    required={true}
                    mode="outlined"
                    onChangeText={(text) => this.setState({ errors: undefined, email: text })}
                />
                <TextInput
                    placeholder="Password"
                    required={true}
                    autoCapitalize="none"
                    mode="outlined"
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <TextInput
                    placeholder="Repeat Password"
                    required={true}
                    autoCapitalize="none"
                    mode="outlined"
                    onChangeText={(text) => this.setState({ errors: undefined, confirmPassword: text })}
                />
                <Button
                    onPress={this._doRegistration}
                    mode="contained"
                    style={{ marginTop: 25 }}
                    accessibilityLabel="Register a new account">Register</Button>

                <Button
                    onPress={ () => this.props.navigation.navigate('Login') }
                    mode="text"
                    accessibilityLabel="Register">Login</Button>
            </View>
        );
    };


    render() {
        // TODO: Fix this so its floating in the center of screen or something

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" animating={this.state.isDoingAction} color="#0000ff" />

                { this._renderRegisterFields() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'stretch',
        flex: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width - 50
    }
});
