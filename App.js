import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import API from './app/api';

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
        const records = await API.get('plates');
        this.setState({ records });
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
