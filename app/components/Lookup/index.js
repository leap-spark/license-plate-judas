import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

import StatePicker from '../StatePicker';


export default class Lookup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plate: '',
            stateISO: '',
        };
    }


    _doSearch = async () => {
        this.props.navigation.navigate('LookupDetail', { ...this.state });
    };


    _doReportSubmission = async () => {
        this.props.navigation.navigate('Mood', { ...this.state });
    };


    render() {
        return (
            <View style={styles.container}>
                <StatePicker
                    selectedValue={this.state.stateISO}
                    style={{ height: 50, width: 250 }}
                    required={true}
                    onValueChange={ (stateISO) => this.setState({ stateISO }) } />

                <TextInput
                    style={styles.input}
                    placeholder="Enter License Plate"
                    maxLength={7}
                    required={true}
                    label="License Plate Number"
                    onChangeText={ (plate) => this.setState({ plate: this.state.stateISO + plate.toUpperCase() }) }
                    mode="flat"
                />

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._doSearch}
                        mode="contained"
                        color="#2C3A47"
                        theme={{ roundness: 0 }}
                        disabled={!this.state.plate && !this.state.stateISO}
                        accessibilityLabel="Search">Search</Button>
                    <Button
                        onPress={this._doReportSubmission}
                        mode="contained"
                        color="#58B19F"
                        dark={true}
                        theme={{ fontWeight: 'bold', roundness: 0 }}
                        disabled={!this.state.plate && !this.state.stateISO}
                        accessibilityLabel="Report">Report</Button>
                </View>
            </View>
        );
    }
}

Lookup.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    input: {
        width: 250
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30,
    }
});
