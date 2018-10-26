import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBarNavigation from '../TopBarNavigation';
import { withNavigation } from 'react-navigation';


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

export default withNavigation(Wrapper);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
