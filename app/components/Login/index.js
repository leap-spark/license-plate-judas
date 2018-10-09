import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SecureStore } from 'expo';
import firebase from '../../api';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errors: undefined,
            isDoingAction: false,
            invalidateToken: false,
            formAction: 'register',
        };
    }


    _doLogin = async (e) => {
        e.preventDefault();

        await firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch((error) => {
            console.log(error.message);
            this.setState({ errors: error.message });
        });

        if (firebase.auth().currentUser) {
            await this._loginSuccess(firebase.auth().currentUser);
        }

        this.setState({ isDoingAction: false });
    };


    _doRegistration = async () => {
        this.setState({ isDoingAction: true });

        const password = hash.MD5(this.state.password + config.salt);
        const records = await API.post('users', {
            fields: {
                email: this.state.username,
                password
            }
        });

        console.log(records);

        if (records.length) {
            await this._loginSuccess(records[0]);
        } else {
            await this._loginFail();
        }

        this.setState({ isDoingAction: false });
    };


    _loginSuccess = async (data) => {
        // await SecureStore.setItemAsync('UserStore:data', JSON.stringify(data));
        this.props.navigation.navigate('Lookup');
    };


    _loginFail = async ({ message }) => {
        await this.setState({
            error: message
        });
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
        const errors = this.state.errors ? (<Text>{ this.state.errors }</Text>) : null;

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

                { errors }

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
