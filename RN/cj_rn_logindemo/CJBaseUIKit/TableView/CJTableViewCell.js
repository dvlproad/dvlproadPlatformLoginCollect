// CJTableViewCell.js
import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";

export default class CJTableViewCell extends Component {
    static propTypes = {
        showTitle: PropTypes.string,
        clickAction: PropTypes.func,
        arrowImageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    };

    static defaultProps = {
        showTitle: "",
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
                <Image style={{ marginRight: 10 }} source={this.props.arrowImageSource} />
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
