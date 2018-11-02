import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import LookupDetail from '../../components/LookupDetail';
import Wrapper from '../../components/Wrapper';


export default class LookupDetailView extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.navigation.setParams({
            backEnabled: true,
            title: 'Viewing Details'
        });
    }


    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <LookupDetail navigation={this.props.navigation} />
                </View>
            </Wrapper>
        );
    }
}

LookupDetailView.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
