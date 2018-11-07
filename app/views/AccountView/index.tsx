import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { INavigation } from "../../typings";
import Wrapper from '../../components/Wrapper/index';
import MyAccount from '../../components/MyAccount/index';


interface IProps {
    navigation: INavigation,
}

export default class AccountView extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    public componentWillMount(): void {
        this.props.navigation.setParams({
            backEnabled: true,
            title: 'My Account'
        });
    }


    public render(): React.ReactNode {
        return (
            <Wrapper>
                <View style={styles.home}>
                    <MyAccount />
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
