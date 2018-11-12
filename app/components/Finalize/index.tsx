import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { API } from '../../lib/index';
import { INavigation } from "../../typings";


interface IProps {
    navigation: INavigation,
}

interface IState {
    plate: string,
    doingAction: boolean,
    mood: string,
    reason: string,
}

interface IUpdate {
    [name: string]: any;
}

export default class Reason extends Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);

        this.state = {
            doingAction: true,
            plate: this.props.navigation.getParam('plate').toUpperCase(),
            mood: this.props.navigation.getParam('mood'),
            reason: this.props.navigation.getParam('reason'),
        };
    }


    public async componentDidMount(): Promise<any> {

        /**
         * [1] Generate a new key in the reports tree
         * [2] Grab the current users UID
         *
         * Next, we need to start collecting the updates that are going to be made to the tree.
         * [3] First we need to store the plate as an index in the offenders tree by setting it to true
         * [4] Next the report key should be appended to the users_meta under the reports_submitted child
         * [5] Lastly, in the offenders_meta tree, using the plate as an index, append the report_key child
         *
         * [6] Run the update
         * [7] Return the key so that the next view can know which report to update
         */
        const REPORT_KEY = await API.getNextRefKey('/reports'); // [1]
        const userID = await API.getCurrentUserID(); // [2]

        let updates: IUpdate = {};
        updates['/offenders/' + this.state.plate] = true; // [3]

        updates['/reports/' + REPORT_KEY] = {
            plate_number: this.state.plate,
            mood: this.state.mood,
            reason: this.state.reason,
            reported_by: userID,
            location: false,
            timestamp: new Date()
        };

        updates['/users_meta/' + userID + '/reports_submitted/' + REPORT_KEY] = true; // [4]
        updates['/offenders_meta/' + this.state.plate  + '/associated_reports/' + REPORT_KEY] = true; // [5]

        await API.postArrayOfUpdates(updates); // [6]

        this.setState({ doingAction: false });

        this._redirect();
    }


    private _redirect = (): void => {
        setTimeout(() => {
            this.props.navigation.navigate('Lookup');
        }, 2000);
    };


    public render(): React.ReactNode {
        return (
            <View>
                <Text>Finalizing</Text>
                { this.state.doingAction ? <ActivityIndicator /> : <Icon name="done" size={70} color="green" /> }
            </View>
        );
    }
}
