import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Register from '../../components/Register';
import Wrapper from '../../components/Wrapper';


// TODO: Needs styling
export default class RegisterView extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.navigation.setParams({ 'title': 'Register' });
    }


    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Register navigation={ this.props.navigation } />

                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login') }>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
