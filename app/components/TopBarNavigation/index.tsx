import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

export default class TopBarNavigation extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    private _goBack = (): void => this.props.navigation.goBack();


    private _onMore = (): void => this.props.navigation.toggleDrawer();


    public render(): React.ReactNode {
        const backButton = this.props.navigation.getParam('backEnabled') && (<Appbar.BackAction onPress={this._goBack} />);

        return (
            <Appbar.Header>
                {backButton}

                <Appbar.Content
                    title={ this.props.navigation.getParam('title') || 'License Plate Judas' }
                />
                <Appbar.Action icon="more-vert" onPress={this._onMore} />
            </Appbar.Header>
        );
    }
}
