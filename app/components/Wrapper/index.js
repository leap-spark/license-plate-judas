import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBarNavigation from '../TopBarNavigation';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';


class Wrapper extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { children } = this.props;

        // Pass the navigation to all child components
        const childrenWithProps = React.Children.map(children, (child) =>
            React.cloneElement(child, { navigation: this.props.navigation })
        );

        return (
            <View style={styles.container}>
                <TopBarNavigation navigation={this.props.navigation} />

                { childrenWithProps }
            </View>
        );
    }
}

Wrapper.propTypes = {
    navigation: PropTypes.object,
};

export default withNavigation(Wrapper);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
