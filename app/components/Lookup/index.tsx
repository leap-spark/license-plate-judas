import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import StatePicker from '../StatePicker/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

interface IState {
    plate: string,
    stateISO: string,
}

export default class Lookup extends Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            plate: '',
            stateISO: '',
        };
    }


    private _doSearch = async (): Promise<object> => {
        return this.props.navigation.navigate('LookupDetail', { ...this.state });
    };


    private _doReportSubmission = async (): Promise<object> => {
        return this.props.navigation.navigate('Mood', { ...this.state });
    };


    public render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <StatePicker
                    selectedValue={this.state.stateISO}
                    style={{ height: 50, width: 250 }}
                    required={true}
                    onValueChange={ (stateISO: string) => this.setState({ stateISO }) } />

                <TextInput
                    style={styles.input}
                    placeholder="Enter License Plate"
                    maxLength={7}
                    label="License Plate Number"
                    onChangeText={ (plate: string) => this.setState({ plate: this.state.stateISO + plate.toUpperCase() }) }
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
                        theme={{ roundness: 0 }}
                        disabled={!this.state.plate && !this.state.stateISO}
                        accessibilityLabel="Report">Report</Button>
                </View>
            </View>
        );
    }
}

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
