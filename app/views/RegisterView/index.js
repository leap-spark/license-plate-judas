import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Register from '../../components/Register';
import { Text, Title } from 'react-native-paper';
import Logo from '../../components/Logo';


const RegisterView = (props) => (
    <View style={styles.home}>
        <Logo />
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

RegisterView.propTypes = {
    navigation: PropTypes.object,
};

export default RegisterView;
