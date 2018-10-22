import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Navigation from '../Navigation';
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
            <ScrollView>
                <Navigation navigation={this.props.navigation} />

                <View style={styles.home}>
                    { childrenWithProps }
                </View>
            </ScrollView>
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

export default withNavigation(Wrapper);
