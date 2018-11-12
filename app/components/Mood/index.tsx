import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

export default class Mood extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    private _setMood = (mood: string) => {
        this.props.navigation.navigate('Reason', {
            plate: this.props.navigation.getParam('plate'),
            mood,
        });
    };


    public render(): React.ReactNode {
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

const style = StyleSheet.create({
    moods: {
        alignItems: 'stretch',
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    angry: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FD7272'
    },
    happy: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#58B19F'
    },
    text: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    }
});
