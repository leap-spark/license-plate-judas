import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from '../../firebase';
import { Storage } from '../../lib';
import { Button, TextInput } from 'react-native-paper';


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


    render() {
        // TODO: Fix this so its floating in the center of screen or something
        const loadingIndicator = this.state.isDoingAction ? (<ActivityIndicator size="large" color="#0000ff" />) : null;

        return (
            <View style={ styles.container }>
                { loadingIndicator }

                <TextInput
                    placeholder="Username"
                    autoCapitalize="none"
                    required={ true }
                    autoFocus={ true }
                    mode="outlined"
                    onChangeText={(text) => this.setState({ errors: undefined, email: text })}
                />
                <TextInput
                    placeholder="Password"
                    required={ true }
                    autoCapitalize="none"
                    mode="outlined"
                    onChangeText={(text) => this.setState({ errors: undefined, password: text })}
                />
                <Button
                    onPress={this._doLogin}
                    mode="contained"
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
        width: require('Dimensions').get('window').width - 50
    }
});
