// CJBaseUIKit.js

'use strict';

// list
import CJCollectionView from "./collectionView/CJCollectionView";
import CJCollectionCell from "./collectionView/CJCollectionCell";

// datePicker
import CJDatePicker, {CJDatePickerCreateTimeType} from "./datePicker/CJDatePicker";
import CJBaseDatePicker, {CJDatePickShowType} from "./datePicker/CJBaseDatePicker";

var CJBaseUIKit = {
  // collectionView 集合视图
  CJCollectionView,
  CJCollectionCell,

  // datePicker 日期选择器
  CJDatePickShowType,         // 日期器的选择样式
  CJDatePickerCreateTimeType, // 日期选择器创建的时机
  CJBaseDatePicker,
  CJDatePicker,
};

module.exports = CJBaseUIKit;
