// LKEntryHomeComponent.js
import React, {Component} from 'react';
import {  Alert, Dimensions } from 'react-native';
import PropTypes from "prop-types";
import {
    CJCollectionView
} from '../../CJBaseUIKit/CJBaseUIKit';
import LuckinRoute from "../navigation/LuckinRoute";


export default class LKEntryHomeComponent extends Component {
    static propTypes = {
        moduleModels: PropTypes.array,
    }

    static defaultProps = {
        moduleModels: [],
    }

    // 导航
    // static navigationOptions = ({ navigation }) => {
    //     return LKNavigationFactory.backPageNavigationOptions({ navigation }, `导航栏标题`)
    // };

    constructor(props) {
        super(props);
        this.state = {
            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
        };
    }


    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }

    execModuleModel= (index)=>{
        let moduleModel = this.state.moduleModels[index];

        if (moduleModel.clickButtonHandle) {
            moduleModel.clickButtonHandle(index, moduleModel);
        } else if (moduleModel.nextPageName && moduleModel.nextPageName.length > 0) {
            // this.props.navigation.navigate(moduleModel.nextPageName);
            LuckinRoute.push(this.props.navigation, moduleModel.nextPageName, {});
        } else {
            Alert.alert("提示：请至少设置 moduleModel.clickButtonHandle 或 moduleModel.nextPageName");
        }
    }



    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <CJCollectionView
                // style={{paddingHorizontal: 40}}   //谨记：这边设置无效
                listWidth={listWidth}
                sectionInset={{top:15, left:15, bottom:15, right:15}}
                cellWidthFromPerRowMaxShowCount={2} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                // cellWidthFromFixedWidth={165}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={165/165}
                minimumInteritemSpacing={15}
                minimumLineSpacing={10}
                moduleModels={this.state.moduleModels}
                clickButtonHandle={this.execModuleModel}
                imageLoadedCountChange={this.imageLoadedCountChange}
            />
        );
    }
}
