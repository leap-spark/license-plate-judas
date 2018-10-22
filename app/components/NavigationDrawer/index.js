import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { DrawerItems } from 'react-navigation';


// TODO: Put logo or image or whatever here to fancy it up
export default (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <Text>License Plate Judas</Text>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
    },
});
