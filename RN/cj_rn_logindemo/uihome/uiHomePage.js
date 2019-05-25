import React, {Component} from 'react';
import { StyleSheet, Alert, Text, View, SectionList, TouchableOpacity, Image } from 'react-native';
import { SubmitButton } from "../helathCerApp/cjdemobuttonfactory";

class UIButtonHomePage extends Component {
    render() {
        return (

            <ScrollView style={{backgroundColor: "#62ffaa", paddingHorizontal: 15}}>
                <View style={{marginTop: 40}}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={[
                            {isShowEditTitle: true, isDisabled: false},
                            {isShowEditTitle: true, isDisabled: true},
                            {isShowEditTitle: false, isDisabled: false},
                            {isShowEditTitle: false, isDisabled: true},
                        ]}
                        renderItem={({item}) => <TestSubmitButton isShowEditTitle={item.isShowEditTitle}
                                                                  isDisabled={item.isDisabled}/>}
                        //ItemSeparatorComponent={this.renderSeparator} //写法1
                        ItemSeparatorComponent={() => (<Separator/>)} //写法2
                    />
                </View>
            </ScrollView>

        );
    }
}

export default class UIHomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderItem = (info) => {
        let txt = info.item.title;
        return <ItemComponent showTitle={txt} />
    }

    _sectionComp = (info) => {
        let txt = info.section.key;
        return <Text
            style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
    }

    render() {
        let sections = [
            { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },
            { key: "B", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
            { key: "C", data: [{ title: "成吉思汗" }, { title: "超市快递" }] },
            { key: "W", data: [{ title: "王磊" }, { title: "王者荣耀" }, { title: "往事不能回味" },{ title: "王小磊" }, { title: "王中磊" }, { title: "王大磊" }] },
        ];

        return (
            <View style={{ flex: 1 }}>
                <SectionList
                    keyExtractor={(item, index) => index.toString()}
                    renderSectionHeader={this._sectionComp}
                    renderItem={this._renderItem}
                    sections={sections}
                    ItemSeparatorComponent={() => <View style={{backgroundColor: "#E5E5E5", height: 1}} />}
                    ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录</Text></View>}
                    ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录尾部</Text></View>}
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
            showTitle: "标题"
        };
    }



    _onPressButton() {
        //this.state.navigation.navigate("B")
        //Alert.alert('You tapped the button!')
    }


    render() {
        //const {navigate} = this.props.navigation;

        return (
            <TouchableOpacity style={styles.cell} onPress={this._onPressButton.bind(this)} underlayColor="white" >
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
                <Image style={{ marginRight: 10 }} source={require("./resourse/item_arrow_right.png")} />
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