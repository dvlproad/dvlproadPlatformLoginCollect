import React, { Component } from 'react';

import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import LKSingleDateActionText from "../../commonUI/date/LKSingleDateActionText";


export default class ComJSSingleDatePage3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            birthdayDateString: '2004-02-29',
            fullDateString: '2008-02-29 08:08:08',
        }
    }


    render() {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        return (
            <View style={{flex:1, backgroundColor: '#f9fafb', justifyContent: 'center', alignItems: 'center'}}>
                <LKSingleDateActionText style={{marginTop: 10}}
                                        placeholder= {"选择日期"}
                                        chooseDateString={this.state.birthdayDateString}
                                        allowPickDate={true}
                                        onDateChange={ (date) => {
                                            this.setState({
                                                birthdayDateString: date
                                            })
                                        }}
                                        isBankStyle={false}
                />


            </View>
        )
    }
}