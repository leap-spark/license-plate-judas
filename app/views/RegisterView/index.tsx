import React from 'react';
import { StyleSheet, View } from 'react-native';

import Register from '../../components/Register/index';
import { Text } from 'react-native-paper';
import Logo from '../../components/Logo/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

const RegisterView = (props: IProps) => (
    <View style={styles.home}>
        <Logo />
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

export default RegisterView;
