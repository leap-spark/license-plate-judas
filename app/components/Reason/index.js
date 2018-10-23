import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { reasonsDictionary } from '../../config';


export default class Reason extends Component {

    colors = [
        '#F97F51', '#1B9CFC', '#58B19F', '#FD7272' , '#82589F', '#182C61', '#6D214F', '#BDC581',
    ];


    constructor(props) {
        super(props);
    }


    _setReason = async (reason) => {
        this.props.navigation.navigate('Finish', {
            plate: this.props.navigation.getParam('plate'),
            mood: this.props.navigation.getParam('mood'),
            reason,
        });
    };


    render() {
        const mood = this.props.navigation.getParam('mood');
        const reasonElements = reasonsDictionary[mood].map((reason, i) => {
            return (
                <TouchableHighlight
                    style={[styles.item, { backgroundColor: this.colors[i] }]}
                    key={i}
                    underlayColor="#55E6C1"
                    onPress={ () => this._setReason(reason.id) }>
                    <View style={styles.itemChild}>
                        <Icon name={reason.icon} size={50} color="#fff" />
                        <Text style={styles.itemChildText}>{reason.name}</Text>
                    </View>
                </TouchableHighlight>
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
        borderWidth: 1,
        borderColor: '#303030',
        height: '25%',
        justifyContent: 'center',
        width: '50%'
    },
    itemChild: {
        alignItems: 'center',
    },
    itemChildText: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
});
