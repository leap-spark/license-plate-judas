import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
import API from '../../api';
import config from '../../config';
import hash from 'object-hash';


export default class Login extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: undefined,
        };
    }


    _onSubmit = async () => {
        await this._doLogin();
    };


    _doLogin = async () => {
        const password = hash.MD5(this.state.password + config.salt);
        const query = `?fields%5B%5D=token&filterByFormula=AND(username%3D%22${this.state.username}%22,password%3D%22${password}%22)`;
        const records = await API.get('users', query);

        if (records.length) {
            await this._loginSuccess(records[0]);
        } else {
            await this._loginFail();
        }
    };


    _loginSuccess = async (data) => {
        await AsyncStorage.setItem('@UserStore:data', JSON.stringify(data));
        this.props.navigation.navigate('HomeView');
    };


    _loginFail = async () => {
        await this.setState({
            errors: 'Username/Password Incorrect'
        });
    };


    render() {
        const errors = this.state.errors ? (<Text>{ this.state.errors }</Text>) : null;

        return (
            <View style={ styles.container }>

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
