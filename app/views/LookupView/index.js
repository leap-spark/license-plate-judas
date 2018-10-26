import React, { Component } from 'react';

import Lookup from '../../components/Lookup';
import Wrapper from '../../components/Wrapper';


export default class LookupView extends Component {

    componentWillMount() {
        this.props.navigation.setParams({
            backEnabled: false,
            title: 'License Plate J.U.D.A.S'
        });
    }


    render() {
        return (
            <Wrapper>
                <Lookup navigation={this.props.navigation} />
            </Wrapper>
        );
    }
}
