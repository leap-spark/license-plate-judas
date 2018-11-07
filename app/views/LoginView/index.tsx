import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Text } from 'react-native-paper';

import Login from '../../components/Login/index';
import Logo from '../../components/Logo/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

const LoginView = (props: IProps) => (
    <View style={styles.home}>
        <Logo />
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
    },
});

export default LoginView;
