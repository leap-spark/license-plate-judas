import React from 'react';
import { StyleSheet, View } from 'react-native';

import Register from '../../components/Register';
import { Text, Title } from 'react-native-paper';


// TODO: Needs styling
export default (props) => (
    <View style={styles.home}>
        <Title>License Plate Judas</Title>
        <Text>Register</Text>
        <Register navigation={props.navigation} />
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
