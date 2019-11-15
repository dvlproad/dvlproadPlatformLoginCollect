/**
 * CJBaseUIKit.js
 *
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-05-09 10:30:47
 * @modify date 2019-05-09 10:30:47
 * @desc [CJBaseUIKit]
 */

'use strict';

// text 文本
import CJCenterText from "./text/CJText";

// button 按钮
import CJTextButton from "./button/CJTextButton";
import CJImageButton from "./button/CJImageButton";
import CJTextImageButton from "./button/CJTextImageButton";
import CJImageTextButton from "./button/CJImageTextButton";

// navigation 导航栏(含路由)
// import CJNavigationFactory from "./navigation/CJNavigationFactory";
import CJNavigationUtil from "./navigation/CJNavigationUtil";

// TableView 列表视图
import CJSectionTableView from "./TableView/CJSectionTableView";

// CollectionView 集合视图
import CJCollectionView from "./collectionView/CJCollectionView";
import CJCollectionCell from "./collectionView/CJCollectionCell";
import CJImageLookCollectionView from "./collectionView/CJImageLookCollectionView";
import CJImageActionCollectionView from "./collectionView/CJImageActionCollectionView";

// datePicker 日期选择器
import CJBaseDatePicker, {CJDatePickShowType} from "./datePicker/CJBaseDatePicker";
import CJDatePicker, {CJDatePickerCreateTimeType} from "./datePicker/CJDatePicker";

// areaPicker 地区选择器
import {CJAreaPickShowType} from "./areaPicker/CJAreaPickerView";
import CJAreaPicker from "./areaPicker/CJAreaPicker";


var CJBaseUIKit = {
  // text 文本
  CJCenterText,

  // button 按钮
  CJTextButton,
  CJImageButton,
  CJTextImageButton,
  CJImageTextButton,

  // navigation 导航栏(含路由)
  // CJNavigationFactory, //(不要引用该类，即请将该类实现复制一遍在具体APP中再自己相应修改一下即可)
  CJNavigationUtil,

  // TableView 列表视图
  CJSectionTableView,

  // CollectionView 集合视图
  CJCollectionView,
  CJCollectionCell,
  CJImageLookCollectionView,
  CJImageActionCollectionView,

  // datePicker 日期选择器
  CJDatePickShowType,         // 日期器的选择样式
  CJDatePickerCreateTimeType, // 日期选择器创建的时机
  CJBaseDatePicker,
  CJDatePicker,

  // areaPicker 地区选择器
  CJAreaPickShowType,
  CJAreaPicker,
};

module.exports = CJBaseUIKit;
