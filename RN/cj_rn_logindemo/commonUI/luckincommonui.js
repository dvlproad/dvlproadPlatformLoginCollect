// luckincommonui.js

'use strict';


// toast
import LKToastUtil from "./toast/LKToastUtil";

// alert
import LKAlertModal from "./modal/LKAlertModal";

// actionSheet
import {LKActionSheet, LKPhotoCameraSheet, LKActionSheetFactory} from "./modal/LKActionSheet";
import LKActionSheetComponent, { LKActionDom } from "./modal/LKActionSheetComponent";
import LKActionSheetModal from "./modal/LKActionSheetModal";

// progressHUD
import LKProgressHUD from "./hud/LKProgressHUD";

// modal
import {LKLoadingModal} from "./modal/LKLoadingModal";

// button
import LKTextButton, { LKBlueBGBottomButton, LKBlueBGButton, LKWhiteBGButton} from './button/LKTextButton';
import {LKBackAppButton, LKBackButton, LKDeleteButton, LKImageButton} from "./button/LKImageButton";
import {LKEditSubmitButton} from "./button/LKEditSubmitButton";
import LKTextImageButton from "./button/LKTextImageButton";

// image
import LKLoadingImage, { ImageUploadType } from "./image/LKLoadingImage";
import LKActionLoadingImage from "./image/LKActionLoadingImage";

// empty
import LKEmptyNetwork, {LKDataEmpty, LKAPILoadStatus} from "./empty/LKEmptyNetwork";


// date
import LKRNActionSingleDateText from "./date/LKRNActionSingleDateText";
import LKRNActionRangeDateText, { LKRangeDateEditingType } from "./date/LKRNActionRangeDateText";


// list
import LKImagesChooseList from "./list/LKImagesChooseList";
// import LKSelectListModal from "./list/LKSelectListModal";
import LKEntryHomeComponent from "./list/LKEntryHomeComponent";
import LKImageHomeComponent from "./list/LKImageHomeComponent";
import LKImageActionCollectionView from "./list/LKImageActionCollectionView";
import LKImageActionHomeComponent from "./list/LKImageActionHomeComponent";



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
import LKNavigationFactory from "./navigation/LKNavigationFactory";
import LuckinRoute from "./navigation/LuckinRoute";


var LKCommonUI = {
  // toast
  LKToastUtil,

  // alert
  LKAlertModal,

  // navigation 导航栏(含路由)
  LKNavigationFactory,
  LuckinRoute,

  // sheet
  LKActionSheet,
  LKPhotoCameraSheet,
  LKActionSheetFactory,
  LKActionSheetComponent,
  LKActionDom,
  LKActionSheetModal,

  // progress
  LKProgressHUD,

  // modal
  LKLoadingModal,

  // textButton
  LKTextButton,
  LKBlueBGBottomButton,
  LKBlueBGButton,
  LKWhiteBGButton,

  // imageButton
  LKBackAppButton,
  LKBackButton,
  LKDeleteButton,
  LKImageButton,
  LKEditSubmitButton,
  LKTextImageButton,

  // image
  LKLoadingImage,
  ImageUploadType,
  LKActionLoadingImage,

  // empty
  LKEmptyNetwork,
  LKDataEmpty,
  LKAPILoadStatus,

  LKRNActionSingleDateText,
  LKRNActionRangeDateText,
  LKRangeDateEditingType,

  // list
  LKImagesChooseList,
  // LKSelectListModal,
  LKEntryHomeComponent,
  LKImageHomeComponent,
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
