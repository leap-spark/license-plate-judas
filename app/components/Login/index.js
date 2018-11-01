import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import firebase from '../../firebase';
import { API, Helpers, Storage, ErrorHandler } from '../../lib';

// TODO: Add HelperText components to username field to hint if invalid/malformed email address
// @see https://callstack.github.io/react-native-paper/helper-text.html

// TODO: Add HelperText components to password field to hint if illegal characters used
// @see https://callstack.github.io/react-native-paper/helper-text.html

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isDoingAction: false,
            invalidateToken: false,
            formAction: 'register',
        };
    }


    async componentDidMount() {
        if (await Storage.get('Token')) {
            this.props.navigation.navigate('Lookup');
        }
    }


    _startActivityIndicators = () => {
        this.setState({ isDoingAction: true });
    };


    _endActivityIndicators = () => {
        this.setState({ isDoingAction: false });
    };


    _doLogin = async () => {
        this._startActivityIndicators();

        await API.signInUser(this.state.email, this.state.password);

        this._endActivityIndicators();

        // new ErrorHandler('logged in', 0);

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }
    };


    _loginSuccess = async () => {
        const token = await firebase.auth().currentUser.uid;
        await Storage.set('Token', token);

        this.props.navigation.navigate('Lookup');
    };


    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" animating={this.state.isDoingAction} />

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    required={true}
                    mode="flat"
                    label="Email Address"
                    onChangeText={(text) => this.setState({ errors: undefined, email: text })}
                />
                <HelperText
                    type="error"
                    visible={!Helpers.isValidEmail(this.state.email)}>
                    Email Address isn't valid
                </HelperText>

                <TextInput
                    placeholder="Password"
                    required={true}
                    autoCapitalize="none"
                    mode="flat"
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <Button
                    onPress={this._doLogin}
                    mode="contained"
                    loading={this.state.isDoingAction}
                    disabled={this.state.isDoingAction}
                    style={{ marginTop: 25 }}
                    accessibilityLabel="Login to the app">Login</Button>

                <Button
                    onPress={ () => this.props.navigation.navigate('Register') }
                    mode="text"
                    accessibilityLabel="Register">Register</Button>
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
