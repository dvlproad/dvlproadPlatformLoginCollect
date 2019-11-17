// lkcui.js

'use strict';

import {
    // demo base Page的基类
    LKDemoScrollHomeComponent,
    LKDemoTableHomeComponent,
    LKDemoCollectionHomeComponent,
    LKDemoChooseBasePage,

    // navigation 导航栏(含路由)
    LKNavigationFactory,
    LuckinRoute,

    // Toast
    LKToast,

    // ActionSheet
    LKActionSheet,
    LKMultipleChooseActionSheet,

    // collection
    LKEntryHomeComponent,
    LKImageLookHomeComponent,
    LKImageActionCollectionView,
    LKImageActionHomeComponent,

    // 日期选择
    LKDatePickShowType,
    LKDatePickerCreateTimeType,
    LKComJSDatePicker,
    LKDatePicker,

    // 地区选择
    LKAreaPicker,
} from "../commonUIEmployee/commonUIEmployee";


var LKCUI = {
    // demo base Page的基类
    LKDemoScrollHomeComponent,
    LKDemoTableHomeComponent,
    LKDemoCollectionHomeComponent,
    LKDemoChooseBasePage,

    // navigation 导航栏(含路由)
    LKNavigationFactory,
    LuckinRoute,

    // Toast
    LKToast,

    // ActionSheet
    LKActionSheet,
    LKMultipleChooseActionSheet,

    // collection
    LKEntryHomeComponent,
    LKImageLookHomeComponent,
    LKImageActionCollectionView,
    LKImageActionHomeComponent,

    // 日期选择
    LKDatePickShowType,
    LKDatePickerCreateTimeType,
    LKComJSDatePicker,
    LKDatePicker,
    /**
     * <LKDatePicker ref={ref => this.datePicker = ref} />
     *
     * onPress={()=>{
                            this.datePicker.showAllEvent(
                                this.state.dateString2,
                                (dateString)=>{
                                    this.setState({
                                        dateString2: dateString
                                    })
                                },
                                ()=>{},
                                ()=>{},
                            )
                        }}
     */

    // 地区选择
    LKAreaPicker,
};

module.exports = LKCUI;
