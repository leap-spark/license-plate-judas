import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Finalize from '../../components/Finalize';
import Wrapper from '../../components/Wrapper';


export default class FinishView extends Component {

    componentWillMount() {
        this.props.navigation.setParams({
            backEnabled: false,
            title: 'Finishing Up'
        });
    }


    render() {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Finalize navigation={this.props.navigation} />
                </View>
            </Wrapper>
        );
    }
}

FinishView.propTypes = {
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
