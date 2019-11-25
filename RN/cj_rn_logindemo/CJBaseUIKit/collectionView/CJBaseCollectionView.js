/**
 * CJBaseCollectionView.js（本类只能用于继承，且子类只需实现 renderCollectionCell 方法）
 *
 * @Description: CJBaseCollectionView
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-07-12 15:47:33
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FlatList, View, ViewPropTypes } from "react-native";
import { ObjectCJHelper } from '../../CJBaseHelper/CJBaseHelper';

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class CJBaseCollectionView extends Component {
    static propTypes = {
        listWidth: PropTypes.number.isRequired,
        sectionInset: PropTypes.object,
        minimumInteritemSpacing: PropTypes.number,  // 水平方向上box之间的最少间隔
        minimumLineSpacing: PropTypes.number,       // 竖直方向上box之间的间隔

        // 以下值必须二选一设置（默认cellWidthFromFixedWidth设置后，另外一个自动失效）
        cellWidthFromFixedWidth: PropTypes.number,          // 通过cell的固定宽度来设置每个cell的宽度
        cellWidthFromPerRowMaxShowCount: PropTypes.number,  // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
        widthHeightRatio: PropTypes.number,         // 宽高的比例（默认1:1，即1.0）
        forceBoxHorizontalIntervalEqualMinimumInteritemSpacing: PropTypes.bool,  //强制水平方向上box之间的间隔固定为最小间隔的值

        dataModels: PropTypes.array,
    };

    static defaultProps = {
        listWidth: 0,
        sectionInset: { top: 0, left: 0, bottom: 0, right: 0 },
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,

        // 以下值必须二选一设置（默认cellWidthFromFixedWidth设置后，另外一个自动失效）
        cellWidthFromPerRowMaxShowCount: 3,
        // cellWidthFromFixedWidth: 165,
        widthHeightRatio: 1.0,  //宽高的比例
        forceBoxHorizontalIntervalEqualMinimumInteritemSpacing: false,

        dataModels: [],
    };

    // 获取当前box与下一个box之间的水平间隔
    __getBoxHorizontalInterval = (index, perRowMaxShowCount, boxHorizontalInterval) => {
        let isLastColumn = (index + 1) % perRowMaxShowCount == 0;

        if (isLastColumn == true) {
            return 0;
        }
        return boxHorizontalInterval;
    }

    // 获取当前box与下一个box之间的竖直间隔
    __getBoxVerticalInterval = (index, lastRowStartIndex, boxHorizontalInterval) => {
        if (index >= lastRowStartIndex) {
            return 0;
        }
        return boxHorizontalInterval;
    }

    /**
     * 子类必须重写：子类重绘cell
     *
     * @param item
     * @param index
     * @param defaultCollectCellStyle
     * @returns {null}
     */
    renderCollectionCell(item, index, defaultCollectCellStyle) {
        return null;
    }

    /**
     * 子类一般不用重写，即使用父类的即可；特例，如图片列表界面中的添加按钮，我们就需要额外为数据加一个addImageModel
     * @param dataMRodels   集合视图中的数据
     */
    getRenderDataModels(dataModels) {
        let renderDataModels = Array.from(dataModels);
        return renderDataModels;
    }

    render() {
        // 以下值必须二选一设置（默认cellWidthFromFixedWidth设置后，另外一个自动失效）
        let perRowMaxShowCount = 0;     // 每行最后最多显示多少个
        let boxWidth = 0;               // box的宽
        let boxHorizontalInterval = 0;  // 水平方向上box之间的间隔
        let sectionInset = this.props.sectionInset;
        if (typeof sectionInset === 'undefined') {
            sectionInset = { top: 0, left: 0, bottom: 0, right: 0 };
        }
        console.log((sectionInset));

        const validWidth = this.props.listWidth - sectionInset.left - sectionInset.right;
        if (this.props.cellWidthFromFixedWidth > 0) { // 按固定宽时候：宽不变，列数变，间距跟着变
            boxWidth = this.props.cellWidthFromFixedWidth;

            const minimumInteritemSpacing = this.props.minimumInteritemSpacing;
            perRowMaxShowCount = (validWidth + minimumInteritemSpacing) / (boxWidth + minimumInteritemSpacing);
            perRowMaxShowCount = Math.floor(perRowMaxShowCount);

            if (this.props.forceBoxHorizontalIntervalEqualMinimumInteritemSpacing) {
                boxHorizontalInterval = minimumInteritemSpacing;
            } else {
                const cellsWidth = boxWidth * perRowMaxShowCount;
                const totalInteritemSpacing = validWidth - cellsWidth;
                boxHorizontalInterval = totalInteritemSpacing / (perRowMaxShowCount - 1);
            }

        } else { // 按列数时候：列数不变，间距不变，固定为minimumInteritemSpacing；宽会变
            perRowMaxShowCount = this.props.cellWidthFromPerRowMaxShowCount;
            if (ObjectCJHelper.isNullForObject(perRowMaxShowCount) || perRowMaxShowCount == 0) {
                expect.assertions(1)
            }

            const minimumInteritemSpacing = this.props.minimumInteritemSpacing;
            if (ObjectCJHelper.isNullForObject(minimumInteritemSpacing)) {
                console.log("Error:请设置minimumInteritemSpacing");
                expect.assertions(1)
            }

            const cellsWidth = validWidth - (perRowMaxShowCount - 1) * minimumInteritemSpacing;
            boxWidth = Math.ceil(cellsWidth / perRowMaxShowCount);

            boxHorizontalInterval = minimumInteritemSpacing;
        }
        const boxVerticalInterval = this.props.minimumLineSpacing;
        const boxHeight = boxWidth / this.props.widthHeightRatio;



        let renderDataModels = this.getRenderDataModels(this.props.dataModels);
        let itemCount = renderDataModels.length;
        let rowCount = 0;
        if (itemCount > 0) {
            rowCount = Math.floor((itemCount - 1) / perRowMaxShowCount) + 1;
        }
        let lastRowStartIndex = (rowCount - 1) * perRowMaxShowCount; //最后一行的索引起点，index从0开始

        let sectionInsetStyle = {};
        if (typeof (sectionInset) != 'undefined') {
            sectionInsetStyle = {
                paddingTop: sectionInset.top,
                paddingLeft: sectionInset.left,
                paddingBottom: sectionInset.bottom,
                paddingRight: sectionInset.right,
            }
        }

        // let listHeaderComponent = null;
        // if (this.props.showHeader) {
        //     let headerText = 'listHeaderText:';
        //     listHeaderComponent = ()=>{
        //         return (
        //             <Text>{headerText}</Text>
        //         )
        //     }
        // }

        return (
            <FlatList
                style={[{ backgroundColor: '#F4F4F4' }, this.props.style, sectionInsetStyle]}
                data={renderDataModels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    let cellMarginRight = this.__getBoxHorizontalInterval(index, perRowMaxShowCount, boxHorizontalInterval);
                    let cellMarginBottom = this.__getBoxVerticalInterval(index, lastRowStartIndex, boxVerticalInterval);

                    let defaultCollectCellStyle = {
                        width: boxWidth,
                        height: boxHeight,
                        marginRight: cellMarginRight,
                        marginBottom: cellMarginBottom,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 6,
                        borderWidth: 0,
                    };

                    return (
                        this.renderCollectionCell(item, index, defaultCollectCellStyle)
                    )
                }}
                numColumns={perRowMaxShowCount}

            // ListHeaderComponent={listHeaderComponent}
            />
        )
    }
}