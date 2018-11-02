import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types';

import firebase from '../../firebase';
import { API, Helpers, Storage } from '../../lib';


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
                    autoCapitalize="none"
                    required={true}
                    mode="flat"
                    label="Email Address"
                    onChangeText={(text) => this.setState({ errors: undefined, email: text })}
                />
                <HelperText
                    type="error"
                    visible={ this.state.email && !Helpers.isValidEmail(this.state.email) }>
                    Email Address isn't valid
                </HelperText>

                <TextInput
                    required={true}
                    autoCapitalize="none"
                    mode="flat"
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <TextInput
                    required={true}
                    autoCapitalize="none"
                    mode="flat"
                    label="Repeat Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ errors: undefined, confirmPassword: text })}
                />
                <HelperText
                    type="error"
                    visible={this.state.password !== this.state.confirmPassword}>
                    Passwords don't match
                </HelperText>

                <Button
                    onPress={this._doRegistration}
                    mode="contained"
                    loading={this.state.isDoingAction}
                    disabled={this.state.isDoingAction}
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

Login.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'stretch',
        justifyContent: 'center',
        width: Dimensions.get('window').width - 50
    }
});
