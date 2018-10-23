import React from 'react';
import { StyleSheet, View } from 'react-native';

import Register from '../../components/Register';


// TODO: Needs styling
export default (props) => (
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
