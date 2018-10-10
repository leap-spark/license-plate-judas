import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
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
        const offender = await firebase.database().ref('/offenders').child(this.state.plate).once('value')
            .then((snapshot) => snapshot.val());

        if (!offender) {
            return null;
        }

        return await firebase.database().ref('/offenders_meta').child(this.state.plate + '/associated_reports').once('value')
            .then((snapshot) => snapshot.val());
    };


    _doReportSubmission = async () => {

        // TODO: We need to do some sanitation checks on the state.plate
        // TODO: Improve the error handling

        /**
         * [1] Generate a new key in the reports tree
         * [2] Grab the current users UID
         *
         * Next, we need to start collecting the updates that are going to be made to the tree.
         * [3] First we need to store the plate as an index in the offenders tree by setting it to true
         * [4] Next the report key should be appended to the users_meta under the reports_submitted child
         * [5] Lastly, in the offenders_meta tree, using the plate as an index, append the report_key child
         *
         * [6] Run the update
         * [7] Return the key so that the next view can know which report to update
         */
        const REPORT_KEY = firebase.database().ref('/reports').push().key; // [1]
        const userID = await firebase.auth().currentUser.uid; // [2]

        let updates = {};
        updates['/offenders/' + this.state.plate] = true; // [3]

        // For debugging purposes
        // updates['/reports/' + REPORT_KEY] = {
        //     plate_number: this.state.plate,
        //     mood: false,
        //     reason: false,
        //     reported_by: userID,
        //     location: false,
        //     timestamp: new Date()
        // };

        updates['/users_meta/' + userID + '/reports_submitted/' + REPORT_KEY] = true; // [4]
        updates['/offenders_meta/' + this.state.plate  + '/associated_reports/' + REPORT_KEY] = true; // [5]

        await firebase.database().ref().update(updates).catch((error) => console.log(error)); // [6]

        // [7]
        return await this.setState({
            key: REPORT_KEY
        });
    };


    render() {
        return (
            <View>
                <TextInput
                    style={ styles.input }
                    placeholder="Enter License Plate"
                    maxLength={ 6 }
                    autoCapitalize={ true }
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
