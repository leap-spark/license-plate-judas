import React from 'react';
import { StyleSheet, View } from 'react-native';


export default (props) => (
    <View style={[ styles.statusBarBackground, props.style || {}]}>
    </View>
);

const styles = StyleSheet.create({
    statusBarBackground: {
        height: 25,
        backgroundColor: 'tomato',
    }
});
