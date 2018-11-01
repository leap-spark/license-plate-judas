import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Text } from 'react-native-paper';

import Login from '../../components/Login';


// TODO: Needs styling
export default (props) => (
    <View style={styles.home}>
        <Title>License Plate Judas</Title>
        <Text>Login</Text>
        <Login navigation={props.navigation} />
    </View>
);

const styles = StyleSheet.create({
    home: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
});
