import React, {Component} from 'react';
import {Alert, Text, View, ScrollView, FlatList} from 'react-native';
import {SubmitButton} from "../helathCerApp/cjdemobuttonfactory";

export default class ButtonHome extends Component {
    renderSeparator() {
        return <Separator/>;
    }

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


class Separator extends Component {
    render() {
        return (
            <Text style={{justifyContent: "center"}}>--------</Text>
        );
    }
}


class TestSubmitButton extends SubmitButton {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...this.state
    //     };
    // }

    render() {
        return (
            <SubmitButton isShowEditTitle={this.props.isShowEditTitle} isDisabled={this.props.isDisabled}
                          clickEditTitleHandle={() => {
                              Alert.alert("你点击了编辑按钮！");
                          }}
                          clickSubmitTitleHandle={() => {
                              Alert.alert("你点击了提交按钮！");
                          }}
            />
        );
    }
}
