// index.js

'use strict';


// toast
import LKToastUtil from "./toast/LKToastUtil";

// button
import LKTextButton from './button/LKTextButton';
import {LKBackAppButton, LKBackButton, LKDeleteButton, LKImageButton} from "./button/LKImageButton";
import {LKEditSubmitButton} from "./button/LKEditSubmitButton";
import LKTextImageButton from "./button/LKTextImageButton";

// image
import LKLoadingImage from "./image/LKLoadingImage";
import LKActionLoadingImage from "./image/LKActionLoadingImage";
import OtherLoadingImage from "./image/OtherLoadingImage";
import UnDecoupleActionLoadingImage from "./image/UnDecoupleActionLoadingImage";

// empty
import LKEmptyNetwork, {LKDataEmpty} from "./empty/LKEmptyNetwork";

// date
import LKComJSActionSingleDateText from "./date/LKComJSActionSingleDateText";
import LKComNativeActionSingleDateText from "./date/LKComNativeActionSingleDateText";
import LKOwnNativeActionSingleDateText from "./date/LKOwnNativeActionSingleDateText";
import LKOwnNativeActionRangeDateText from "./date/LKOwnNativeActionRangeDateText";
import LKSingleDateText from "./date/LKSingleDateText";
import LKRangeDateText from "./date/LKRangeDateText";

// list
import GoodsChooseList from "./list/GoodsChooseList";
import HomeSectionList from "./list/HomeSectionList";
import LKImagesChooseList from "./list/LKImagesChooseList";
import {LKActionSheet} from "./modal/LKActionSheet";
import LKAlertModal from "./modal/LKAlertModal";

// picker
import DatePicker from "./react-native-pickers/DatePicker";




// import React, { Component } from 'react';
// export class Class extends Component  {
//   render() {
//     LKToastUtil
//   }
// }

var LKCommonUI = {
  LKToastUtil,

  LKTextButton,
  LKBackAppButton,

  LKBackButton,
  LKDeleteButton,
  LKImageButton,
  LKEditSubmitButton,
  LKTextImageButton,

  // image
  LKLoadingImage,
  LKActionLoadingImage,
  OtherLoadingImage,
  UnDecoupleActionLoadingImage,

  // empty
  LKEmptyNetwork,
  LKDataEmpty,

  // date
  LKComJSActionSingleDateText,
  LKComNativeActionSingleDateText,
  LKOwnNativeActionSingleDateText,
  LKOwnNativeActionRangeDateText,
  LKSingleDateText,
  LKRangeDateText,

  // list
  GoodsChooseList,
  HomeSectionList,
  LKImagesChooseList,
  LKActionSheet,

  // picker
  DatePicker,
};

module.exports = LKCommonUI;
