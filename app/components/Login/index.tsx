import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import firebase from '../../firebase/index';
import { API, Helpers, Storage } from '../../lib/index';
import { INavigation } from "../../typings";

// TODO: Add HelperText components to username field to hint if invalid/malformed email address
// @see https://callstack.github.io/react-native-paper/helper-text.html

// TODO: Add HelperText components to password field to hint if illegal characters used
// @see https://callstack.github.io/react-native-paper/helper-text.html


interface IProps {
    navigation: INavigation,
}

interface IState {
    email: string,
    password: string,
    confirmPassword: string,
    isDoingAction: boolean,
    invalidateToken: boolean,
    formAction: string,
    errors: any,
}

export default class Login extends Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isDoingAction: false,
            invalidateToken: false,
            formAction: 'register',
            errors: '',
        };
    }


    public async componentDidMount() {
        if (await Storage.get('Token')) {
            this.props.navigation.navigate('Lookup');
        }
    }


    private _startActivityIndicators = (): void => {
        this.setState({ isDoingAction: true });
    };


    private _endActivityIndicators = (): void => {
        this.setState({ isDoingAction: false });
    };


    private _doLogin = async (): Promise<any> => {
        this._startActivityIndicators();

        await API.signInUser(this.state.email, this.state.password);

        this._endActivityIndicators();

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }
    };


    private _loginSuccess = async (): Promise<object> => {
        const token = await firebase.auth().currentUser.uid;
        await Storage.set('Token', token);

        return this.props.navigation.navigate('Lookup');
    };


    public render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" animating={this.state.isDoingAction} />

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
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
                    placeholder="Password"
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
        justifyContent: 'center',
        width: Dimensions.get('window').width - 50
    }
});
