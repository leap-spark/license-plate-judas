import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import API from '../../api';
import config from '../../config';
import hash from 'object-hash';
import Storage from '../../lib/storage';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: undefined,
            isLoggingIn: false,
        };
    }


    _doLogout = async () => {
        await Storage.set('UserAuthToken', '');

        this.setState({
    };


    _doLogin = async () => {
        this.setState({ isLoggingIn: true });

        const password = hash.MD5(this.state.password + config.salt);
        const query = `?fields%5B%5D=token&filterByFormula=AND(username%3D%22${this.state.username}%22,password%3D%22${password}%22)`;
        const records = await API.get('users', query);

        if (records.length) {
            await this._loginSuccess(records[0]);
        } else {
            await this._loginFail();
        }

        this.setState({ isLoggingIn: false });
    };


    _loginSuccess = async (data) => {
        await Storage.set('UserAuthToken', data.fields.token);
        this.props.navigation.navigate('Lookup');
    };


    _loginFail = async () => {
        await this.setState({
            errors: 'Username/Password Incorrect'
        });
    };


    render() {
        const errors = this.state.errors ? (<Text>{ this.state.errors }</Text>) : null;

        // TODO: Fix this so its floating in the center of screen
        const loading = this.state.isLoggingIn ? (<ActivityIndicator size="large" color="#0000ff" />) : null;

        return (
            <View style={ styles.container }>
                { loading }

                { errors }

                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Username"
                    autoCapitalize="none"
                    required={ true }
                    autoFocus={ true }
                    onChangeText={(text) => this.setState({ errors: undefined, username: text })}
                />
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Password"
                    required={ true }
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <Button
                    onPress={this._onSubmit}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Login to the app"
                />
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
