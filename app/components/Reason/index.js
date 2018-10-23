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
            plate: this.props.navigation.getParam('plate'),
            mood: this.props.navigation.getParam('mood'),
            reason: '',
        };
    }


    _doSetReason = async (reason) => {
        await this.setState({ reason });
        this.props.navigation.navigate('Finish', { ...this.state });
    };


    render() {
        const reasonElements = this.reasons.map((reason, i) => {
            return (
                <TouchableOpacity style={ styles.item } key={ i } onPress={ () => this._doSetReason(reason.id) }>
                    <Text>{ reason.name }</Text>
                </TouchableOpacity>
            );
        });

        return (
            <View style={ styles.container }>
                { reasonElements }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item: {
        alignItems: 'center',
        backgroundColor: '#ececec',
        borderWidth: 1,
        borderColor: 'black',
        height: '25%',
        justifyContent: 'center',
        width: '50%'
    }
});
