//HomeSectionList.js
import React, {Component} from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Alert } from 'react-native';
import type {PressEvent} from "react-native/Libraries/Types/CoreEventTypes";
import PropTypes from "prop-types";


export default class HomeSectionList extends Component {
    static propTypes = {
        sections: PropTypes.array,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        sections: [],
        onPress: (nextPageName)=>{},
    };

    constructor(props) {
        super(props);
    }


    _renderItem = (info) => {
        let txt = info.item.title;
        let nextPageName = info.item.page;
        return <ItemComponent showTitle={txt} clickAction={() => (this.props.onPress(nextPageName))} />
    }

    _sectionComp = (info) => {
        let txt = info.section.key;
        return <Text
            style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
    }

    render() {
        return (
            <SectionList
                keyExtractor={(item, index) => index.toString()}
                renderSectionHeader={this._sectionComp}
                renderItem={this._renderItem}
                sections={this.props.sections}
                ItemSeparatorComponent={() => <View style={{backgroundColor: "#E5E5E5", height: 1}} />}
                ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录</Text></View>}
                ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录尾部</Text></View>}
            />
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
                <Image style={{ marginRight: 10 }} source={require("./images/item_arrow_right.png")} />
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