import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { SecureStore } from 'expo';
import Storage from '../../lib/storage';
import firebase from '../../api';


export default class Lookup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plate: ''
        };
    }


    _doSearch = async () => {
        this.props.navigator.navigate('LookupDetail', { plate: this.state.plate });
    };


    _doReportSubmission = async () => {
        this.props.navigator.navigate('Mood', { plate: this.state.plate });
    };


    render() {
        return (
            <View>
                <Button
                    onPress={ async () => {
                        firebase.auth().signOut();
                        await SecureStore.deleteItemAsync('Token');
                        this.props.navigator.navigate('Auth');
                    }}
                    title="Signout"
                />
                <TextInput
                    style={ styles.input }
                    placeholder="Enter License Plate"
                    maxLength={ 6 }
                    required={ true }
                    autoFocus={ true }
                    onChangeText={ (plate) => this.setState({ plate }) }
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={ this._doSearch }
                        title="Search"
                        accessibilityLabel="Search"
                        style={styles.button}
                    />
                    <Button
                        onPress={ this._doReportSubmission }
                        title="Report"
                        style={ styles.ghostBtn }
                        accessibilityLabel="Report"
                    />
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
