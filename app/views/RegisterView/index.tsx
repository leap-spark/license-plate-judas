import React from 'react';
import { StyleSheet, View } from 'react-native';

import Register from '../../components/Register/index';
import Logo from '../../components/Logo/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

const RegisterView = (props: IProps) => (
    <View style={styles.home}>
        <Logo />
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
    },
});

export default RegisterView;
