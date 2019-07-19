//EditSubmitButtonPage.js
import React, {Component} from 'react';
import {Button, Alert, Text, View, ScrollView, FlatList, TouchableWithoutFeedback} from 'react-native';
// import {LKEditSubmitButton} from "../../commonUI/button/LKEditSubmitButton";
import { LKEditSubmitButton } from "../../commonUI/luckincommonui";

export default class EditSubmitButtonPage extends Component {
    renderSeparator() {
        return <Separator/>;
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: "#f2f2f2", paddingHorizontal: 15}}>
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

                <View style={{paddingTop: 60, alignItems: 'center'}}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            marginBottom: 30,
                            width: 260,
                            alignItems: 'center',
                            backgroundColor: '#2196F3'
                        }}>
                            <Text
                                style={{padding: 20, color: 'white'}}
                            >
                                TouchableWithoutFeedback
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ height: 64, width: 64, borderRadius: 12, backgroundColor:'#ff0000', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:24, textAlign:'center', backgroundColor:"green"}}>1</Text>
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


class TestSubmitButton extends LKEditSubmitButton {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...this.state
    //     };
    // }

    render() {
        return (
            <LKEditSubmitButton isShowEditTitle={this.props.isShowEditTitle}
                                isDisabled={this.props.isDisabled}
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
