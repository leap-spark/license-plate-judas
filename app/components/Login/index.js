import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SecureStore } from 'expo';
import firebase from '../../api';


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: undefined,
        };
    }


    _doLogin = async (e) => {
        e.preventDefault();

        await firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch((error) => {
            console.log(error.message);
            this.setState({ errors: error.message });
        });

        if (firebase.auth().currentUser) {
            await this._loginSuccess();
        }
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
                    onPress={this._doLogin}
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
