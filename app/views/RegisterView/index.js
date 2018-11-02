import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Register from '../../components/Register';


// TODO: Needs styling
const RegisterView = (props) => (
    <View style={styles.home}>
        <Register navigation={props.navigation} />
    </View>
);

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

RegisterView.propTypes = {
    navigation: PropTypes.object,
};

export default RegisterView;
