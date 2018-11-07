import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Finalize from '../../components/Finalize/index';
import Wrapper from '../../components/Wrapper/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

export default class FinishView extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }

    public componentWillMount(): void {
        this.props.navigation.setParams({
            backEnabled: false,
            title: 'Finishing Up'
        });
    }


    public render(): React.ReactNode {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Finalize navigation={this.props.navigation} />
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
        justifyContent: 'center',
    },
});
