import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default class Reason extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plate: this.props.navigator.getParam('plate'),
            mood: this.props.navigator.getParam('mood'),
            reason: '',
        };
    }


    _doSetReason = async (reason) => {
        await this.setState({ reason });
        this.props.navigator.navigate('Finish', { ...this.state });
    };


    render() {
        return (
            <View>
                <TouchableOpacity onPress={ () => this._doSetReason('reason_1') }>
                    <Text>Reason 1</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this._doSetReason('reason_2') }>
                    <Text>Reason 2</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this._doSetReason('reason_3') }>
                    <Text>Reason 3</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this._doSetReason('reason_4') }>
                    <Text>Reason 4</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
