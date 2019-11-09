/**
 * CJBaseUIKit.js
 *
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [集合视图主页]
 */

'use strict';

// navigation 导航栏(含路由)
import CJNavigationFactory from "./navigation/CJNavigationFactory";
import CJNavigationUtil from "./navigation/CJNavigationUtil";

// collectionView 集合视图
import CJCollectionView from "./collectionView/CJCollectionView";
import CJCollectionCell from "./collectionView/CJCollectionCell";

// datePicker 日期选择器
import CJDatePicker, {CJDatePickerCreateTimeType} from "./datePicker/CJDatePicker";
import CJBaseDatePicker, {CJDatePickShowType} from "./datePicker/CJBaseDatePicker";

var CJBaseUIKit = {
  // navigation 导航栏(含路由)
  CJNavigationFactory,
  CJNavigationUtil,

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
