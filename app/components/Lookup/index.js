import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Login from '../Login';
import { createStackNavigator } from 'react-navigation';


export default class Lookup extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter License Plate"
                    maxLength={6}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigator.navigate('Login')}
                    >
                        <Text> Lookup </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.ghostBtn}
                    >
                        <Text> Submit </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        width: 200,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#777',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30,
    },
    button: {
        backgroundColor: '#DDDDDD',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
    },
    ghostBtn: {
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
    }
});
