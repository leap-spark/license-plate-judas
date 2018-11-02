import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';


export default class ReportList extends Component {

    constructor(props) {
        super(props);
    }


    _listItemTemplate = (item) => {
        const mood = item.mood === 'happy' ? 'mood' : 'mood-bad';
        const date = new Date(item.timestamp);
        const datestr = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

        return (
            <List.Item
                key={item.uuid}
                title={item.reason}
                description={item.location + ' @ ' + datestr}
                left={ () => <List.Icon icon={mood} color="#000" /> }
            />
        );
    };


    render() {
        return (
            <FlatList {...this.props}
                ListHeaderComponent={<List.Section title="Latest Reports"/>}
                ListFooterComponent={<List.Section/>}
                renderItem={({ item }) => this._listItemTemplate(item)} />
        );
    }
}

ReportList.propTypes = {
    data: PropTypes.array,
    initialNumToRender: PropTypes.number,
};
