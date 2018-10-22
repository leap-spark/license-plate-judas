import React from 'react';
import { StyleSheet, View } from 'react-native';

import Login from '../../components/Login';
import Wrapper from '../../components/Wrapper';


// TODO: Needs styling
export default (props) => (
    <Wrapper>
        <View style={ styles.home }>
            <Login navigation={ props.navigation } />
        </View>
    </Wrapper>
);

const styles = StyleSheet.create({
    home: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
});
