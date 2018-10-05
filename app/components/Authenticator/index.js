import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SecureStore } from 'expo';
import Storage from '../../lib/storage';


export default class Authenticator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthed: false,
        };
    }


    _checkIfAuthenticated = async () => {
        return await Storage.get('UserAuthToken');
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
