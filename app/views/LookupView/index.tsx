import React, { Component } from 'react';

import Lookup from '../../components/Lookup/index';
import Wrapper from '../../components/Wrapper/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

export default class LookupView extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    public componentWillMount(): void {
        this.props.navigation.setParams({
            backEnabled: false,
            title: 'License Plate J.U.D.A.S'
        });
    }


    public render(): React.ReactNode {
        return (
            <Wrapper>
                <Lookup navigation={this.props.navigation} />
            </Wrapper>
        );
    }
}
