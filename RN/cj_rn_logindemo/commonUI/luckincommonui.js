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

import {
  // demo base Page的基类
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

  // date
  LKDatePickShowType,
  LKComJSDatePicker,
  LKDatePicker,

  // area 地区选择
  LKAreaPicker,
} from "../commonUIEmployee/commonUIEmployee";


var LKCommonUI = {
  // toast
  LKToastUtil,

  // alert
  LKAlertModal,

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


  // demo base Page的基类
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

  // date
  LKDatePickShowType,
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

  // area 地区选择
  LKAreaPicker,
};

module.exports = LKCommonUI;
