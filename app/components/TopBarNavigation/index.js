import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';


export default class TopBarNavigation extends Component {

    constructor(props) {
        super(props);
    }


    _goBack = () => this.props.navigation.goBack();


    _onMore = () => this.props.navigation.toggleDrawer();


    render() {
        return (
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={this._goBack}
                />
                <Appbar.Content
                    title={ this.props.navigation.getParam('title') || 'License Plate Judas' }
                />
                <Appbar.Action icon="more-vert" onPress={this._onMore} />
            </Appbar.Header>
        );
    }
}
