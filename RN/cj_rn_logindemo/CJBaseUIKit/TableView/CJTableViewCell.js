// CJTableViewCell.js
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";

export default class CJTableViewCell extends Component {
    static propTypes = {
        text: PropTypes.string,
        detailText: PropTypes.string,
        clickAction: PropTypes.func,
        arrowImageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    };

    static defaultProps = {
        text: "",
        detailText: PropTypes.string,
        clickAction: (nextPageName)=>{},
        arrowImageSource: require("./resources/item_arrow_right.png"),
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        //const {navigate} = this.props.navigation;

        return (
            <TouchableOpacity style={styles.cellBox} onPress={this.props.clickAction} underlayColor="white" >
                <Text style={styles.cellText}>
                    {this.props.text}
                </Text>
                <View style={{ marginRight: 10, flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: 'center' }}>
                    <Text style={styles.cellDetailText}>
                        {this.props.detailText}
                    </Text>
                    <Image source={this.props.arrowImageSource} />
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    cellBox: {
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

    cellText: {   //单行文本水平&垂直居中
        height: 44,
        lineHeight:44,
        textAlign: 'center',
        backgroundColor: "#FFFFFF",
        fontSize: 17,
        color: '#5C5C5C',
        marginHorizontal: 10
    },
    cellDetailText: {   //单行文本水平&垂直居中
        height: 44,
        lineHeight:44,
        textAlign: 'center',
        backgroundColor: "transparent",
        fontSize: 15,
        color: '#333333',
        marginHorizontal: 10
    },
})

