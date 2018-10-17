import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from '../../components/Login';


// TODO: Needs styling
export default (props) => (
    <View style={ styles.home }>
        <Login navigation={ props.navigation } />
    </View>
);

const styles = StyleSheet.create({
    home: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
});
