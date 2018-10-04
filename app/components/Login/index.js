import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import API from '../../api';
import config from '../../config';
import hash from 'object-hash';
import { createStackNavigator } from 'react-navigation';


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        console.log(this.props.navigation.navigate('Login'));
        this.state = {
            username: '',
            password: '',
            errors: undefined,
        };
    }


    async onSubmit() {
        const password = hash.MD5(this.state.password + config.salt);
        const query = `?fields%5B%5D=username&fields%5B%5D=password&filterByFormula=AND(username%3D%22${this.state.username}%22,password%3D%22${password}%22)`;
        const records = await API.get('users', query);

        if (!records.length) {
            this.setState({
                errors: 'Username/Password Incorrect'
            });

            return null;
        }

        this.props.navigation.navigate('homeView');
    }


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
                    onPress={this.onSubmit}
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
