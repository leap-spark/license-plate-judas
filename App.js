import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import env from 'env2';
env('.env');

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

    async componentDidMount() {
        await this.fetchAirtable();
    }

    async fetchAirtable() {
        try {
            let response = await fetch(`https://api.airtable.com/v0/${config.base}/${config.table}?maxRecords=${config.maxRecords}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
            });
            const { records } = await response.json();
            this.setState({ records });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { records } = this.state;

        return (
            <View style={styles.container}>
                {records && records.length > 0 ? records.map(record =>
                    <Text>{JSON.stringify(record)}</Text>
                ) : <Text>Double-check that you have added your API key to .env.</Text>}
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
