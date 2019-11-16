// luckincommonui.js

'use strict';

// demo base Page的基类
import LKDemoScrollHomeComponent from "./Demo/LKDemoScrollHomeComponent";
import LKDemoTableHomeComponent from "./Demo/LKDemoTableHomeComponent";
import LKDemoCollectionHomeComponent from "./Demo/LKDemoCollectionHomeComponent";
import LKDemoChooseBasePage from "./Demo/LKDemoChooseBasePage";

// base Page的基类
import LKEntryHomeComponent from "./Base/LKEntryHomeComponent";
import LKImageLookHomeComponent from "./Base/LKImageLookHomeComponent";
import LKImageActionHomeComponent from "./Base/LKImageActionHomeComponent";

// navigation 导航栏(含路由)
import LKNavigationFactory from "./Navigation/LKNavigationFactory";
import LuckinRoute from "./Navigation/LuckinRoute";

// CollectionView
import LKImageActionCollectionView from "./CollectionView/LKImageActionCollectionView";



// 日期选择
// import {
//   CJBaseDatePicker as LKComJSDatePicker,
//   CJDatePickShowType as LKDatePickShowType,
//   CJDatePickerCreateTimeType as LKDatePickerCreateTimeType
// } from "../CJBaseUIKit/CJBaseUIKit";

// import { CJBaseDatePicker as LKComJSDatePicker } from "../CJBaseUIKit/CJBaseUIKit";
// import { CJDatePickShowType as LKDatePickShowType } from "../CJBaseUIKit/CJBaseUIKit";
// import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "../CJBaseUIKit/CJBaseUIKit";

import LKDatePicker from "./Pickers/LKDatePicker";
import LKComJSDatePicker from "../CJBaseUIKit/datePicker/CJBaseDatePicker";
import { CJDatePickShowType as LKDatePickShowType } from "../CJBaseUIKit/datePicker/CJBaseDatePicker";
import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "../CJBaseUIKit/datePicker/CJDatePicker";

// 地区选择
import LKAreaPicker from "./Pickers/LKAreaPicker";


var LKCommonUI = {
    // demo base Page的基类
    LKDemoScrollHomeComponent,
    LKDemoTableHomeComponent,
    LKDemoCollectionHomeComponent,
    LKDemoChooseBasePage,

    // navigation 导航栏(含路由)
    LKNavigationFactory,
    LuckinRoute,

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

module.exports = LKCommonUI;
