import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Login from '../../components/Login';


// TODO: Needs styling
export default (props) => (
    <View style={styles.home}>
        <Login navigation={ props.navigation } />

        <TouchableOpacity onPress={ () => props.navigation.navigate('Register') }>
            <Text>
                Register
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
