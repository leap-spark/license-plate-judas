import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBarNavigation from '../TopBarNavigation/index';
import { withNavigation } from 'react-navigation';
import { INavigation } from "../../typings";


interface IProps {
    children?: React.ReactNode,
    navigation?: INavigation,
}

class Wrapper extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    public render(): React.ReactNode {
        // Pass the navigation to all child components
        const childrenWithProps = React.Children.map(this.props.children, (child) =>
            React.cloneElement(child as any, { navigation: this.props.navigation })
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
