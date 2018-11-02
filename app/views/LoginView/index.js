import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Title, Text } from 'react-native-paper';

import Login from '../../components/Login';
import Logo from '../../components/Logo';


const LoginView = (props) => (
    <View style={styles.home}>
        <Logo />
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
    },
});

export default LoginView;
