import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import PropTypes from 'prop-types';


export default class TopBarNavigation extends Component {

    constructor(props) {
        super(props);
    }


    _goBack = () => this.props.navigation.goBack();


    _onMore = () => this.props.navigation.toggleDrawer();


    render() {
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

TopBarNavigation.propTypes = {
    navigation: PropTypes.object,
};
