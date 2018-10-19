import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


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
                <TextInput
                    placeholder="Enter License Plate"
                    maxLength={6}
                    required={true}
                    onChangeText={ (plate) => this.setState({ plate: plate.toUpperCase() }) }
                    mode="outlined"
                />
                <View style={ styles.buttonContainer }>
                    <Button
                        onPress={this._doSearch}
                        mode="contained"
                        accessibilityLabel="Search">Search</Button>
                    <Button
                        onPress={this._doReportSubmission}
                        mode="contained"
                        accessibilityLabel="Report">Report</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30,
    }
});
