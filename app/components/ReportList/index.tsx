import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { FlatList } from 'react-native';


interface IProps {
    data: object[],
    initialNumToRender: number,
}

interface ListItem {
    mood: string,
    timestamp: string,
    location: string,
    uuid: string,
    reason: string,
}

export default class ReportList extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }


    private _listItemTemplate = (item: ListItem): React.ReactElement<any> => {
        const mood: string = item.mood === 'happy' ? 'mood' : 'mood-bad';
        const date: Date = new Date(item.timestamp);
        const datestr: string = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

        return (
            <List.Item
                key={item.uuid}
                title={item.reason}
                description={item.location + ' @ ' + datestr}
                left={ () => <List.Icon icon={mood} color="#000" /> }
            />
        );
    };


    public render(): React.ReactNode {
        return (
            <FlatList {...this.props}
                ListHeaderComponent={<List.Section children={null} title="Latest Reports"/>}
                ListFooterComponent={<List.Section children={null}/>}
                renderItem={({ item }) => this._listItemTemplate(item as ListItem)} />
        );
    }
}
