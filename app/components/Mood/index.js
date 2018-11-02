import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';


export default class Mood extends Component {

    constructor(props) {
        super(props);
    }


    _setMood = (mood) => {
        this.props.navigation.navigate('Reason', {
            plate: this.props.navigation.getParam('plate'),
            mood,
        });
    };


    render() {
        return (
            <View style={style.moods}>
                <TouchableOpacity style={style.happy} onPress={ () => this._setMood('happy') }>
                    <Icon name="mood" size={32} color="#fff" />
                    <Text style={style.text}>Happy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.angry} onPress={ () => this._setMood('angry') }>
                    <Icon name="mood-bad" size={32} color="#fff" />
                    <Text style={style.text}>Angry</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

Mood.propTypes = {
    navigation: PropTypes.object,
};

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
        backgroundColor: '#FD7272'
    },
    happy: {
        ...moodSharedStyle,
        backgroundColor: '#58B19F'
    },
    text: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    }
});
