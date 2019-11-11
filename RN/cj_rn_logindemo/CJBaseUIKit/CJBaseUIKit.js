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

// button 按钮
import CJTextButton from "./button/CJTextButton";
import CJImageButton from "./button/CJImageButton";
import CJTextImageButton from "./button/CJTextImageButton";
import CJImageTextButton from "./button/CJImageTextButton";

// navigation 导航栏(含路由)
// import CJNavigationFactory from "./navigation/CJNavigationFactory";
import CJNavigationUtil from "./navigation/CJNavigationUtil";

// collectionView 集合视图
import CJCollectionView from "./collectionView/CJCollectionView";
import CJCollectionCell from "./collectionView/CJCollectionCell";

// datePicker 日期选择器
import CJDatePicker, {CJDatePickerCreateTimeType} from "./datePicker/CJDatePicker";
import CJBaseDatePicker, {CJDatePickShowType} from "./datePicker/CJBaseDatePicker";

// areaPicker 地区选择器
import CJAreaPicker from "./areaPicker/CJAreaPicker";


var CJBaseUIKit = {
  // button 按钮
  CJTextButton,
  CJImageButton,
  CJTextImageButton,
  CJImageTextButton,

  // navigation 导航栏(含路由)
  // CJNavigationFactory, //(不要引用该类，即请将该类实现复制一遍在具体APP中再自己相应修改一下即可)
  CJNavigationUtil,

  // collectionView 集合视图
  CJCollectionView,
  CJCollectionCell,

  // datePicker 日期选择器
  CJDatePickShowType,         // 日期器的选择样式
  CJDatePickerCreateTimeType, // 日期选择器创建的时机
  CJBaseDatePicker,
  CJDatePicker,

  // areaPicker 地区选择器
  CJAreaPicker,
};

module.exports = CJBaseUIKit;
