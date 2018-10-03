import React from 'react';
import { TextInput, View } from 'react-native';
import { Button } from 'react-native';
import API from '../../api';
import config from '../../config';
import hash from 'object-hash';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
        };
    }


    async onSubmit() {
        const password = hash.MD5(this.state.password + config.salt);
        const records = await API.get('users', `?fields%5B%5D=username&fields%5B%5D=password&filterByFormula=AND(username%3D%22${this.state.username}%22,password%3D%22${password}%22)`);

        // if records is an empty array, user isn't found
        if (!records.length) {
            this.setState({
                errors: 'Username/Password Incorrect'
            });
        }

        // TODO: go to the next view
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Username"
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <TextInput
                    style={{ height: 40, width: 300 }}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({ password: text })}
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
