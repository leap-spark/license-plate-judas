import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


export default class Reason extends Component {

    reasons = [
        { name: 'Slow', id: 'slow' },
        { name: 'Speeds', id: 'speeds' },
        { name: 'No Blinkers', id: 'no_blinkers' },
        { name: 'Cut Off', id: 'cut_off' },
        { name: 'Music Loud', id: 'music_loud' },
        { name: 'Let Me Go', id: 'let_me_go' },
        { name: 'Waved', id: 'waved' },
        { name: 'Considerate', id: 'considerate' },
    ];


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
