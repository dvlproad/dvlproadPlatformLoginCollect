import 'dart:convert';

class ShopModel {
  int count;
  int deptId;
  int distance;
  bool isDefault;
  String address;
  String openingTime;
  String title;

  ShopModel.fromParams(
      {this.count,
        this.deptId,
        this.distance,
        this.isDefault,
        this.address,
        this.openingTime,
        this.title});

  ShopModel.fromMap(shopMap) {
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