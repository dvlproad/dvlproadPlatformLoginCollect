// luckincommonui.js

'use strict';

// demo base Page的基类
import LKDemoTableHomeComponent from "./Demo/LKDemoTableHomeComponent";

// base Page的基类
import LKEntryHomeComponent from "./Base/LKEntryHomeComponent";
import LKImageLookHomeComponent from "./Base/LKImageLookHomeComponent";
import LKImageActionHomeComponent from "./Base/LKImageActionHomeComponent";

// navigation 导航栏(含路由)
import LKNavigationFactory from "./Navigation/LKNavigationFactory";
import LuckinRoute from "./Navigation/LuckinRoute";

// CollectionView
import LKImageActionCollectionView from "./CollectionView/LKImageActionCollectionView";



// picker
// import {
//   CJDatePicker as LKDatePicker,
//   CJBaseDatePicker as LKComJSDatePicker,
//   CJDatePickShowType as LKDatePickShowType,
//   CJDatePickerCreateTimeType as LKDatePickerCreateTimeType
// } from "../CJBaseUIKit/CJBaseUIKit";

// import { CJDatePicker as LKDatePicker } from "../CJBaseUIKit/CJBaseUIKit";
// import { CJBaseDatePicker as LKComJSDatePicker } from "../CJBaseUIKit/CJBaseUIKit";
// import { CJDatePickShowType as LKDatePickShowType } from "../CJBaseUIKit/CJBaseUIKit";
// import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "../CJBaseUIKit/CJBaseUIKit";

import LKDatePicker from "../CJBaseUIKit/datePicker/CJDatePicker";
import LKComJSDatePicker from "../CJBaseUIKit/datePicker/CJBaseDatePicker";
import { CJDatePickShowType as LKDatePickShowType } from "../CJBaseUIKit/datePicker/CJBaseDatePicker";
import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "../CJBaseUIKit/datePicker/CJDatePicker";



var LKCommonUI = {
    // demo base Page的基类
    LKDemoTableHomeComponent,

    // navigation 导航栏(含路由)
    LKNavigationFactory,
    LuckinRoute,

    // list
    LKEntryHomeComponent,
    LKImageLookHomeComponent,
    LKImageActionCollectionView,
    LKImageActionHomeComponent,

    // date
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

};

module.exports = LKCommonUI;
