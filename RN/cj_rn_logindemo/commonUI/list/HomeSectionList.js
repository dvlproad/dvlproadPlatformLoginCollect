//HomeSectionList.js
import React, {Component} from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";


export default class HomeSectionList extends Component {
    static propTypes = {
        listHeaderTitle: PropTypes.string,
        listFooterTitle: PropTypes.string,
        sections: PropTypes.array,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        listHeaderTitle: '',
        listFooterTitle: '',
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
        let listHeaderComponent = null;
        if (this.props.listHeaderTitle.length > 0) {
            listHeaderComponent = ()=>{
                return <ListHeaderFooter title={this.props.listHeaderTitle} />
            }
        }

        let listFooterComponent = null;
        if (this.props.listFooterTitle.length > 0) {
            listFooterComponent = ()=>{
                return <ListHeaderFooter title={this.props.listFooterTitle} />
            }
        }


        return (
            <SectionList
                keyExtractor={(item, index) => index.toString()}
                renderSectionHeader={this._sectionComp}
                renderItem={this._renderItem}
                sections={this.props.sections}
                ItemSeparatorComponent={() => <View style={{backgroundColor: "#E5E5E5", height: 1}} />}
                ListHeaderComponent= {listHeaderComponent}
                ListFooterComponent= {listFooterComponent}
            />
        );
    }
}

class ListHeaderFooter extends Component {
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: "",
    };

    render() {
        return (
            <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}>
                <Text style={{ fontSize: 18, color: '#ffffff' }}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}


class ItemComponent extends React.Component {
    static propTypes = {
        showTitle: PropTypes.string,
        clickAction: PropTypes.func,
    };

    static defaultProps = {
        showTitle: "",
        clickAction: (nextPageName)=>{},
    };

    constructor(props) {
        super(props);
        this.state = {

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
                <Image style={{ marginRight: 10 }} source={require("./resources/item_arrow_right.png")} />
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

    listHeaderFooter: {
        backgroundColor: '#25B960',
        alignItems: 'center',
        height: 30
    },
})