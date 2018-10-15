import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default class Mood extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plate: '',
            mood: '',
        };
    }


    async componentDidMount() {
        await this.setState({
            plate: this.props.navigator.getParam('plate')
        });
    }


    _doSetMood = async (mood) => {
        await this.setState({ mood });
        this.props.navigator.navigate('Reason', { ...this.state });
    };


    render() {
        return (
            <View>
                <TouchableOpacity onPress={ () => this._doSetMood('happy') }>
                    <Text>Happy</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this._doSetMood('angry') }>
                    <Text>Angry</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
