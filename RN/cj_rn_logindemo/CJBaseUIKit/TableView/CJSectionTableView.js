//CJSectionTableView.js
import React, {Component} from 'react';
import { Text, View, SectionList } from 'react-native';
import PropTypes from "prop-types";
import CJTableViewCell from "./CJTableViewCell";

export default class CJSectionTableView extends Component {
    static propTypes = {
        listHeaderTitle: PropTypes.string,
        listFooterTitle: PropTypes.string,
        sectionDataModels: PropTypes.array,
        clickModuleModel: PropTypes.func,
    };

    static defaultProps = {
        listHeaderTitle: '',
        listFooterTitle: '',
        sectionDataModels: [],
        clickModuleModel: (moduleModel)=>{},
    };

    constructor(props) {
        super(props);
    }


    _renderItem = (info) => {
        let moduleModel = info.item;

        return (
            <CJTableViewCell
                text={moduleModel.title}
                detailText={moduleModel.valueText}
                clickAction={() => (
                    this.props.clickModuleModel(moduleModel)
                )}
            />
        )
    }

    _sectionComp = (info) => {
        let txt = info.section.key;
        return <Text
            style={{ height: 50, lineHeight: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
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
                sections={this.props.sectionDataModels}
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
