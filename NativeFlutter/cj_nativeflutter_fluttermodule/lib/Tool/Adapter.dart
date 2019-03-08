import 'package:flutter/material.dart';

class Adapter {

  ///item的高度
  static const item = 45;

  /* 根据锤子t2分辨率1080*1920作为基准 */
  Adapter({
    this.width = 1080,
    this.height = 1920,
  });

  int width;
  int height;

  ///当前屏幕宽度dp
  double _screenWidth;

  ///当前屏幕高度dp
  double _screenHeight;

  ///状态栏高度
  double _statusBarHeight;

  ///dp和px比例
  double _pxRatio;

  /* 宽度比例 */
  static double widthRatio;

  /* 高度比例 */
  static double heightRatio;

  /*初始化*/
  init(BuildContext context) {
    MediaQueryData mediaQuery = MediaQuery.of(context);
    _screenWidth = mediaQuery.size.width;
    _screenHeight = mediaQuery.size.height;
    _pxRatio = mediaQuery.devicePixelRatio;
    _statusBarHeight = mediaQuery.padding.top;
    widthRatio = _screenWidth / width;
    heightRatio = _screenHeight / height;
    print("_screenWidth=$_screenWidth" + "_screenHeight=$_screenHeight" +
        "_pxRatio=$_pxRatio" + "_statusBarHeight=$_statusBarHeight");
  }

  /* 手机都是18：9周围波动，宽高都可用宽度的比例换算，如果需要精确，高度请用setHeight*/
  static setWidth(int widthPx) => widthPx * widthRatio;

  static setHeight(int heightPx) => heightPx * heightRatio;

  static double setFont(int fontPx) => fontPx * widthRatio;

}