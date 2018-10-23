import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


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
            plate: this.props.navigation.getParam('plate')
        });
    }


    _doSetMood = async (mood) => {
        await this.setState({ mood });
        this.props.navigation.navigate('Reason', { ...this.state });
    };


    render() {
        return (
            <View style={ style.moods }>
                <TouchableOpacity style={ style.happy } onPress={ () => this._doSetMood('happy') }>
                    <Text>Happy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ style.angry } onPress={ () => this._doSetMood('angry') }>
                    <Text>Angry</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const moodSharedStyle = {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
};

const style = StyleSheet.create({
    moods: {
        alignItems: 'stretch',
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    angry: {
        ...moodSharedStyle,
        backgroundColor: 'tomato'
    },
    happy: {
        ...moodSharedStyle,
        backgroundColor: 'green'
    }
});
