import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const config = {
    base: process.env.AIRTABLE_BASE,
    table: process.env.AIRTABLE_TABLE,
    view: process.env.AIRTABLE_VIEW,
    apiKey: process.env.AIRTABLE_API_KEY,
    maxRecords: process.env.AIRTABLE_MAX_RECORDS
};
export default class App extends React.Component {
    constructor() {
        super();
        this.state = { records: [] };
        this.fetchAirtable = this.fetchAirtable.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
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
});
