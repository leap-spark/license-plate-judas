import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from '../../api';
import Storage from '../../lib/storage';


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


    _handleErrorMessage = (error) => {
        alert(error.message);
    };


    _startActivityIndicators = () => {
        this.setState({ isDoingAction: true });
    };


    _endActivityIndicators = () => {
        this.setState({ isDoingAction: false });
    };


    _doLogin = async () => {
        this._startActivityIndicators();

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(this._handleErrorMessage);

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }

        this._endActivityIndicators();
    };


    _doRegistration = async () => {
        this._startActivityIndicators();

        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords must match');
            return;
        }

        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(this._handleErrorMessage);

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }

        this._endActivityIndicators();
    };


    _loginSuccess = async () => {
        const token = await firebase.auth().currentUser.uid;
        await Storage.set('Token', token);

        this.props.navigation.navigate('Lookup');
    };


    _renderLoginFields = () => {
        return (
            <View>
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Username"
                    autoCapitalize="none"
                    required={ true }
                    autoFocus={ true }
                    onChangeText={(text) => this.setState({ errors: undefined, email: text })}
                />
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Password"
                    required={ true }
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <Button
                    onPress={this._doLogin}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Login to the app"
                />
            </View>
        );
    };


    _renderRegisterFields = () => {
        return (
            <View>
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Email"
                    autoCapitalize="none"
                    required={ true }
                    autoFocus={ true }
                    onChangeText={(text) => this.setState({ errors: undefined, email: text })}
                />
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Password"
                    required={ true }
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Repeat Password"
                    required={ true }
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({ errors: undefined, confirmPassword: text })}
                />
                <Button
                    onPress={this._doRegistration}
                    title="Register"
                    color="#841584"
                    accessibilityLabel="Register"
                />
            </View>
        );
    };


    render() {
        // TODO: Fix this so its floating in the center of screen or something
        const loadingIndicator = this.state.isDoingAction ? (<ActivityIndicator size="large" color="#0000ff" />) : null;
        let elements = null;
        let formAction = '';

        if (this.state.formAction === 'login') {
            elements = this._renderLoginFields();
            formAction = 'register';
        } else if (this.state.formAction === 'register') {
            elements = this._renderRegisterFields();
            formAction = 'login';
        }

        const alternateTheFormAction = (
            <Button
                onPress={ () => this.setState({ formAction })}
                title={ formAction.toUpperCase() }
                color="tomato"
            />
        );

        return (
            <View>
                { loadingIndicator }

                { elements }

                { alternateTheFormAction }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
