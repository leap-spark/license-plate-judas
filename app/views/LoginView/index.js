import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Login from '../../components/Login';


// TODO: Needs styling
const LoginView = (props) => (
    <View style={styles.home}>
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
        justifyContent: 'center'
    },
});

export default LoginView;
