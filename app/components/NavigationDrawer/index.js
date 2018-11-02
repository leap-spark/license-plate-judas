import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableNativeFeedback } from 'react-native';
import { DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { API } from '../../lib';


// TODO: Put logo or image or whatever here to fancy it up
export default (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <Text>License Plate Judas</Text>
            <DrawerItems {...props} />

            {/**
             You'll be tempted to remove the immediately nested View and extract the styles to the TouchableNativeFeedback,
             but the nested component in TouchableNativeFeedback must be a single element
             **/}
            <TouchableNativeFeedback onPress={ async () => {
                await API.signOutUser();
                props.navigation.navigate('Auth');
            }}>
                <View style={styles.drawerItem}>
                    <View style={styles.drawerIcon}>
                        <Icon name="exit-to-app" color="#000" allowFontScaling={false} size={20} />
                    </View>
                    <Text style={styles.drawerText}>
                        Sign-Out
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
    },
    drawerItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    drawerIcon: {
        alignItems: 'center',
        marginHorizontal: 16,
        width: 24,
    },
    drawerText: {
        fontWeight: 'bold',
        margin: 16,
        color: '#000',
    },
});
