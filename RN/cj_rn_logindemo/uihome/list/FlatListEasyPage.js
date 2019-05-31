//FlatListEasyPage.js
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={({item}) => {
                        return (
                            <Text style={{padding: 10, fontSize: 18, height: 44,}}>{item.key}</Text>
                        )
                    }}
                />
            </View>
        );
    }
}
