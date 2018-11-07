import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Mood from '../../components/Mood/index';
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
            title: 'Choose Your Mood'
        });
    }


    public render(): React.ReactNode {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <Mood navigation={this.props.navigation} />
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
