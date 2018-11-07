import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';

import firebase from '../../firebase';
import { API, Helpers, Storage } from '../../lib';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

interface IState {
    email: string,
    password: string,
    confirmPassword: string,
    isDoingAction: boolean,
    invalidateToken: boolean,
    errors: string | null,
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
            errors: '',
        };
    }


    private _startActivityIndicators = (): void => {
        this.setState({ isDoingAction: true });
    };


    private _endActivityIndicators = (): void => {
        this.setState({ isDoingAction: false });
    };


    private _doRegistration = async (): Promise<any> => {
        this._startActivityIndicators();

        await API.registerUser(this.state.email, this.state.password);

        this._endActivityIndicators();

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }
    };


    private _loginSuccess = async (): Promise<object> => {
        const token: string | null = await firebase.auth().currentUser.uid;
        await Storage.set('Token', token);

        return this.props.navigation.navigate('Lookup');
    };


    private _renderRegisterFields = (): object => {
        return (
            <View>
                <TextInput
                    autoCapitalize="none"
                    mode="flat"
                    label="Email Address"
                    onChangeText={(text) => this.setState({ errors: null, email: text })}
                />
                <HelperText
                    type="error"
                    visible={ this.state.email !== '' && !Helpers.isValidEmail(this.state.email) }>
                    Email Address isn't valid
                </HelperText>

                <TextInput
                    autoCapitalize="none"
                    mode="flat"
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ errors: null, password: text })}
                />
                <TextInput
                    autoCapitalize="none"
                    mode="flat"
                    label="Repeat Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ errors: null, confirmPassword: text })}
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


    public render() {
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
        justifyContent: 'center',
        width: Dimensions.get('window').width - 50
    }
});
