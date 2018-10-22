import React, { Component } from 'react';

import Lookup from '../../components/Lookup';
import Wrapper from '../../components/Wrapper';


export default class LookupView extends Component {
    render() {
        return (
            <Wrapper>
                <Lookup navigator={this.props.navigation} />
            </Wrapper>
        );
    }
}
