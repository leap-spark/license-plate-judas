import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Title, Text } from 'react-native-paper';

import Login from '../../components/Login';


// TODO: Needs styling
const LoginView = (props) => (
    <View style={styles.home}>
        <Title>License Plate Judas</Title>
        <Text>Login</Text>
        <Login navigation={props.navigation} />
    </View>
);

LoginView.propTypes = {
    navigation: PropTypes.object,
};

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

export default LoginView;
