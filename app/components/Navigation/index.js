import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';


export default class Navigation extends Component {

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
                    title={this.props.navigation.state.routeName}
                />
                <Appbar.Action icon="more-vert" onPress={this._onMore} />
            </Appbar.Header>
        );
    }
}
