import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SecureStore } from 'expo';


export default class Authenticator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthed: false,
        };
    }


    _checkIfAuthenticated = async () => {
        let data = null;

        try {
            const value = await SecureStore.getItemAsync('username');

            if (value !== null) {
                data = value[0];
            }
        } catch (error) {
            console.error(error);
        }

        return data;
    };


    async componentDidMount() {
        const data = await this._checkIfAuthenticated();

        this.setState({
            isAuthed: data,
        });
    }


    render() {
        if (this.state.isAuthed !== null) {
            return (
                <View>
                    { this.props.children }
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Hello</Text>
                </View>
            );
        }
    }
}
