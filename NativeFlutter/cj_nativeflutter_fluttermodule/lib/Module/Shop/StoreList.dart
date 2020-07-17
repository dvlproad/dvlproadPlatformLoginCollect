import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import "package:pull_to_refresh/pull_to_refresh.dart";

class nativeResult {
  List<StoreItem> shopModels; //门店数组

  nativeResult.fromParams({this.shopModels});
  
  nativeResult.fromJson(nativeResultString) {
    List shopList = json.decode(nativeResultString);
    shopModels = [];
    for (Map shopMap in shopList) {
      StoreItem shopModel = StoreItem.fromMap(shopMap);
      shopModels.add(shopModel);
    }
  }

  @override
  String toString() {
    return '{"nativeResult": $nativeResult}';
  }
}

class StoreItem {
  int count;
  int deptId;
  int distance;
  bool isDefault;
  String address;
  String openingTime;
  String title;

  StoreItem.fromParams(
      {this.count,
      this.deptId,
      this.distance,
      this.isDefault,
      this.address,
      this.openingTime,
      this.title});

  StoreItem.fromMap(shopMap) {
    count = shopMap['count'];
    deptId = shopMap['deptId'];
    distance = shopMap['distance'];
    isDefault = shopMap['isDefault'];
    address = shopMap['address'];
    openingTime = shopMap['openingTime'];
    title = shopMap['title'];
  }

  @override
  String toString() {
    return '{"count": $count,"deptId": $deptId,"distance": $distance,"isDefault": $isDefault,"address": ${address != null ? '${json.encode(address)}' : 'null'},"openingTime": ${openingTime != null ? '${json.encode(openingTime)}' : 'null'},"title": ${title != null ? '${json.encode(title)}' : 'null'}}';
  }
}

class StoreList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _StoreListState();
  }
}

class _StoreListState extends State<StoreList> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _handleRefresh(true);
  }
  
  static const methodChannel =
  const MethodChannel('com.dvlproad.ciyouzen/StoreList');

  final RefreshController _refreshController = new RefreshController();
  List<StoreItem> shopModels = new List<StoreItem>();
  int currentPage;

  Widget buildListItem(BuildContext context, StoreItem item) {
    return GestureDetector(
      onTap: () {
        _itemTapped(item);
      },
      child: Container(
        color: Colors.white,
        child: Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(item.title,
                          style:
                              TextStyle(fontSize: 15, color: Color(0xff333333))),
                      Text(item.distance.toString(),
                          style:
                              TextStyle(fontSize: 15, color: Color(0xff333333)))
                    ]),
                Padding(
                  padding: const EdgeInsetsDirectional.only(
                      start: 0, top: 10, bottom: 10, end: 0),
                  child: Text(item.openingTime,
                      style: TextStyle(fontSize: 13, color: Color(0xff999999))),
                ),
                Text(item.address,
                    style: TextStyle(fontSize: 13, color: Color(0xff999999)))
              ],
            )),
      ),
    );
  }

  void _itemTapped(StoreItem item) {
    methodChannel.invokeMethod('switchShop',item.toString());
  }

  /**
   * 返回键点击
   */
  static const backMethod = 'back';

  Future<void> _getListAction(bool isLoadMore) async {
    try {
      Map<String, dynamic> flutterRequest = {
        "flutterParams": {"currentPage": currentPage}
      };

      final Map nativeResponseMap =
          await methodChannel.invokeMethod('getListAction', flutterRequest);
      String nativeResultStr = nativeResponseMap["nativeResult"];
      nativeResult _nativeResult = nativeResult.fromJson(nativeResultStr);
      setState(() {
        if (isLoadMore) {
          shopModels.addAll(_nativeResult.shopModels);
        } else {
          shopModels = _nativeResult.shopModels;
        }
      });
    } on PlatformException catch (e){}
  }

//  Future<void> _handleRefresh(bool up) {
//    if (up) {
//      currentPage = 0;
//      _getListAction(false).then((val) {
//        currentPage++;
//        _refreshController.sendBack(up, RefreshStatus.canRefresh);
//      });
//    } else {
//      _getListAction(true).then((val) {
//        currentPage++;
//        _refreshController.sendBack(up, RefreshStatus.canRefresh);
//      });
//    }
//  }

  void _handleRefresh(bool up) async{
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use refreshFailed()
    _refreshController.refreshCompleted();
  }

  void onRefresh() {
    _handleRefresh(true);
  }

  /**
   * 返回键点击事件
   */
  Future<Null> _pCenterBack() async {
    Map<String, dynamic> flutterRequest = {};
    _toNativeMethod(backMethod, flutterRequest);
  }

  /**
   * 和natvie通讯
   */
  _toNativeMethod(String tag, Map<String, dynamic> map) async {
    try {
      String result = await methodChannel.invokeMethod(tag, map);
    } on PlatformException catch (e) {
    }
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          leading:
              IconButton(icon: Icon(Icons.arrow_back), onPressed: _pCenterBack),
          title: new Text('选择门店'),
          centerTitle: true,
        ),
        body: SmartRefresher(
            controller: _refreshController,
            enablePullDown: true,
            enablePullUp: true,
            onRefresh: onRefresh,
            child: ListView.separated(
              itemCount: shopModels.length,
              itemBuilder: (BuildContext context, int index) {
                if (shopModels.length > 0) {
                  return buildListItem(context, shopModels[index]);
                }
              },
              separatorBuilder: (context, index) => Divider(height: 1.0),
            )));
  }
}
