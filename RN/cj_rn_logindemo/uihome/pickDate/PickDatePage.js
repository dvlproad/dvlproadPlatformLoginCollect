//PickDatePage.js
import React, { Component } from 'react';
import {Text, ScrollView} from 'react-native';
import CJDemoDateBeginEnd  from '../../commonUI/pickDate/cjdemoDateBeginEnd'

export default class PickDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString: "2000-02-29",
        };
    }

    render() {
        let beginDateString = this.state.beginDateString;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text>当前选择的起始日期为：{beginDateString}</Text>

                <CJDemoDateBeginEnd style={{marginTop: 22}}
                                    isEditing={true}
                                    beginDateString={beginDateString}
                                    onBeginDateChange={ (date)=> {
                                        this.setState({
                                            beginDateString: date
                                        })
                                        //Alert.alert(newBeginDateString);
                                    }}
                />


            </ScrollView>
        );
    }
}