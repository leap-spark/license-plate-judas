import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Reason from '../../components/Reason/index';
import Wrapper from '../../components/Wrapper/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

export default class MoodView extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    public componentWillMount(): void {
        this.props.navigation.setParams({
            backEnabled: true,
            title: 'Choose A Reason'
        });
    }


    public render(): React.ReactNode {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Reason navigation={this.props.navigation} />
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
