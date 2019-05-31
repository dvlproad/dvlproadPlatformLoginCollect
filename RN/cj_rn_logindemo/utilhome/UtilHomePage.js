//UtilHomePage.js
import React, {Component} from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Alert } from 'react-native';
import type {PressEvent} from "react-native/Libraries/Types/CoreEventTypes";


export default class UtilHomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    _onPressButton = (nextPageName) => {
        console.log(nextPageName);

        if (nextPageName) {
            this.props.navigation.navigate(nextPageName)
        } else  {
            //nextPageName = "Button";
            Alert.alert(nextPageName)
        }
    }

    _renderItem = (info) => {
        let txt = info.item.title;
        let nextPageName = info.item.page;
        return <ItemComponent showTitle={txt} clickAction={() => (this._onPressButton(nextPageName))} />
    }

    _sectionComp = (info) => {
        let txt = info.section.key;
        return <Text
            style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
    }

    render() {
        let sections = [
            { key: "A",
                data: [
                    { title: "Date", page: "DateHome" },
                    ]
            },
            { key: "C",
                data: [
                    { title: "成吉思汗" },
                    { title: "超市快递" }
                    ]
            },
        ];

        return (
            <View style={{ flex: 1 }}>
                <SectionList
                    keyExtractor={(item, index) => index.toString()}
                    renderSectionHeader={this._sectionComp}
                    renderItem={this._renderItem}
                    sections={sections}
                    ItemSeparatorComponent={() => <View style={{backgroundColor: "#E5E5E5", height: 1}} />}
                />
            </View>
        );
    }
}


class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            showTitle: "",
            clickAction: (event?: PressEvent) => mixed
        };
    }


    render() {
        //const {navigate} = this.props.navigation;

        return (
            <TouchableOpacity style={styles.cell} onPress={this.props.clickAction} underlayColor="white" >
                <Text style={{
                    flex: 1,
                    height: 44,
                    lineHeight:44,
                    // textAlign: "center",
                    backgroundColor: "#FFFFFF",
                    color: '#5C5C5C',
                    fontSize: 15,
                    marginHorizontal: 10
                }}
                >
                    {this.props.showTitle}
                </Text>
                <Image style={{ marginRight: 10 }} source={require("../commonResource/item_arrow_right.png")} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
})