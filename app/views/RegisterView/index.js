import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Register from '../../components/Register';
import Wrapper from '../../components/Wrapper';


// TODO: Needs styling
export default (props) => (
    <Wrapper>
        <View style={styles.home}>
            <Register navigation={ props.navigation } />

            <TouchableOpacity onPress={ () => props.navigation.navigate('Login') }>
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    </Wrapper>
);

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
