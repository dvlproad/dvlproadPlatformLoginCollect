//ActivityIndicatorPage.js
import React, { Component } from 'react'
import { View, ScrollView, ActivityIndicator, Button } from 'react-native'

export default class ActivityIndicatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{height: 44, backgroundColor: 'red'}}>
                    <Button title={this.state.loading?'点我结束加载':'点我开始加载'}
                            onPress={()=>{
                                let loading = !this.state.loading;
                                this.setState({
                                    loading: loading,
                                })
                            }}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
                    <ActivityIndicator size="small" color="#00ff00" animating={this.state.loading} />
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
                    <ActivityIndicator size="small" color="#00ff00" animating={this.state.loading} />
                </View>
            </ScrollView>
        )
    }
}
