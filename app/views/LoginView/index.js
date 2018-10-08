import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from '../../components/Login';


export default (props) => (
    <View style={styles.home}>
        <Login navigation={ props.navigation } />
    </View>
);

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
